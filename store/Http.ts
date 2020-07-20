type GetParamsObj = {
	[headerName: string]: string | number;
};
export class Http {
	baseUrl: string;
	baseHeaders: {
		[headerName: string]: string;
	};
	defaultParams: {
		[headerName: string]: string | number;
	};

	constructor(baseUrl: string, baseHeaders = {}, defaultParams = {}) {
		this.baseUrl = baseUrl;
		this.baseHeaders = baseHeaders;
		this.defaultParams = defaultParams;
	}

	private urlHelper(url: string, getParamsObj: GetParamsObj = {}) {
		const params = { ...this.defaultParams, ...getParamsObj };
		const paramsKeys = Object.keys(params);
		if (paramsKeys.length > 0) {
			const paramsQuery = paramsKeys.reduce((paramsQuery, paramKey) => {
				paramsQuery !== '?' && (paramsQuery += '&');
				return (paramsQuery +=
					paramKey + '=' + encodeURIComponent(params[paramKey]));
			}, '?');
			return url.match(/^http/)
				? url + paramsQuery
				: this.baseUrl + url + paramsQuery;
		}
		return url.match(/^http/) ? url : this.baseUrl + url;
	}

	get(url: string, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, {
			headers: this.baseHeaders,
		});
	}

	post(url: string, body: { [key: string]: any }, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, this.patchOrPost('POST', body));
	}

	patch(url: string, body: { [key: string]: any }, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		console.log(url);
		return this.handleRequest(url, this.patchOrPost('PATCH', body));
	}

	delete(url: string, getParamsObj = {}) {
		url = this.urlHelper(url, getParamsObj);
		return this.handleRequest(url, {
			method: 'DELETE',
			headers: this.baseHeaders,
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
				...this.baseHeaders,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...body }),
		};
	}
}
