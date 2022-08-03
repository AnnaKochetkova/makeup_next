const baseUrl = 'https://3b8d-109-68-119-45.eu.ngrok.io';
const versionApi = "/api/v1";

export interface IHeaders {
    [key: string]: string;
}

const makeRequest = async <T> (path: string, init?: RequestInit | undefined): Promise<[T, IHeaders]> => {
    const res = await fetch(`${baseUrl}${versionApi}${path}`, init);
    return [(await bodyParse<T>(res)), headerParse(res)];
}

const bodyParse = <T>(response: Response): Promise<T> => {
    return response.json();
}

const headerParse = (response: Response): IHeaders => {
    const headers: IHeaders = {};
    response.headers.forEach((value, key) => headers[key] = value);
    return headers;
}

export default makeRequest
