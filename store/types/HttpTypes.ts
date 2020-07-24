export type ParamsObjCB = (
	currentParams: GetParamsObj,
	baseUrl: string
) => GetParamsObj;

export type GetParamsObj = {
	[headerName: string]: string | number;
};

export type HeadersObj = {
	[headerName: string]: string;
};

export type SetParams = GetParamsObj | ParamsObjCB;

export type HeadersObjCB = (
	currentHeaders: HeadersObj,
	baseUrl: string
) => HeadersObj;

export type SetHeaders = HeadersObj | HeadersObjCB;

export type ReqBody = { [key: string]: any };
