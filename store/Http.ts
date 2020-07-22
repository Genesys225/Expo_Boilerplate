type GetParamsObj = {
	[headerName: string]: string | number;
};
type HeadersObj = {
	[headerName: string]: string;
};
export class Http {
	private _baseUrl: string;
	private _baseHeaders: {
		[headerName: string]: string;
	};
	private _baseParams: {
		[paramName: string]: string | number;
	};

	constructor(baseUrl: string, baseHeaders = {}, baseParams = {}) {
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

	setBaseParams(
		arg0: (arg0: GetParamsObj, arg1: string) => GetParamsObj | GetParamsObj
	) {
		if (typeof arg0 === 'function')
			this._baseParams = arg0(this._baseParams, this._baseUrl);
		else if (typeof arg0 === 'object') this._baseParams = arg0;
		else return false;
		return this;
	}

	setBaseHeaders(
		arg0: (arg0: HeadersObj, arg1: string) => HeadersObj | HeadersObj
	) {
		if (typeof arg0 === 'function')
			this._baseHeaders = arg0(this._baseHeaders, this._baseUrl);
		else if (typeof arg0 === 'object') this._baseHeaders = arg0;
		else return false;
		return this;
	}

	setObject() {}

	private urlHelper(url: string, getParamsObj: GetParamsObj = {}) {
		const params = { ...this._baseParams, ...getParamsObj };
		const paramsKeys = Object.keys(params);
		if (paramsKeys.length > 0) {
			const paramsQuery = paramsKeys.reduce((paramsQuery, paramKey) => {
				paramsQuery !== '?' && (paramsQuery += '&');
				return (paramsQuery +=
					paramKey + '=' + encodeURIComponent(params[paramKey]));
			}, '?');
			return url.match(/^http/)
				? url + paramsQuery
				: this._baseUrl + url + paramsQuery;
		}
		return url.match(/^http/) ? url : this._baseUrl + url;
	}

	public get(url: string, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, {
			headers: this._baseHeaders,
		});
	}

	public post(url: string, body: { [key: string]: any }, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, this.patchOrPost('POST', body));
	}

	public patch(url: string, body: { [key: string]: any }, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		console.log(url);
		return this.handleRequest(url, this.patchOrPost('PATCH', body));
	}

	public delete(url: string, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, {
			method: 'DELETE',
			headers: this._baseHeaders,
		});
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
