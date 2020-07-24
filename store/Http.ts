import {
	GetParamsObj,
	HeadersObj,
	SetParams,
	SetHeaders,
	ReqBody,
} from './types/HttpTypes';

export class Http {
	private _baseUrl: string;
	private _baseHeaders: {
		[headerName: string]: string;
	};
	private _baseParams: {
		[paramName: string]: string | number;
	};

	constructor(
		baseUrl: string,
		baseHeaders: HeadersObj = {},
		baseParams: GetParamsObj = {}
	) {
		this._baseUrl = baseUrl;
		this._baseHeaders = baseHeaders;
		this._baseParams = baseParams;
	}

	get baseUrl() {
		return this._baseUrl;
	}

	get baseHeaders() {
		return this._baseHeaders;
	}

	public setBaseParams(setParams: SetParams) {
		if (typeof setParams === 'function')
			this._baseParams = setParams(this._baseParams, this._baseUrl);
		else if (typeof setParams === 'object') this._baseParams = setParams;
		else return false;
		return this;
	}

	public setBaseHeaders(setHeaders: SetHeaders) {
		if (typeof setHeaders === 'function')
			this._baseHeaders = setHeaders(this._baseHeaders, this._baseUrl);
		else if (typeof setHeaders === 'object') this._baseHeaders = setHeaders;
		else return false;
		return this;
	}

	public get(url: string, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, {
			headers: this._baseHeaders,
		});
	}

	public post(url: string, body: ReqBody, getParamsObj: GetParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, this.patchOrPost('POST', body));
	}

	public patch(url: string, body: ReqBody, getParamsObj: GetParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		console.log(url);
		return this.handleRequest(url, this.patchOrPost('PATCH', body));
	}

	public delete(url: string, getParamsObj: GetParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, {
			method: 'DELETE',
			headers: this._baseHeaders,
		});
	}

	private urlHelper(url: string, getParamsObj: GetParamsObj = {}) {
		url = url.match(/^http/) ? url : this._baseUrl + url;
		const params = { ...this._baseParams, ...getParamsObj };
		const paramsKeys = Object.keys(params);
		if (paramsKeys.length > 0) {
			const paramsQuery = paramsKeys.reduce((paramsQuery, paramKey) => {
				paramsQuery !== '?' && (paramsQuery += '&');
				return (paramsQuery +=
					paramKey + '=' + encodeURIComponent(params[paramKey]));
			}, '?');
			return url + paramsQuery;
		}
		return url;
	}

	private async handleRequest(
		url: string,
		options: RequestInit | null = null
	) {
		try {
			const response: Response = options
				? await fetch(url, options)
				: await fetch(url);
			if (!response.ok)
				throw new Error(
					'Something went wrong!\n' +
						JSON.stringify(await response.json())
				);
			return response.json();
		} catch (error) {
			throw error;
		}
	}

	private patchOrPost(
		method: 'POST' | 'PATCH',
		body: { [key: string]: any }
	) {
		return {
			method,
			headers: {
				...this._baseHeaders,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...body }),
		};
	}
}
