const baseUrl = 'https://e4cd-109-68-112-5.eu.ngrok.io';
const versionApi = "/api/v1";

const makeRequest = async(path: string, init?: RequestInit | undefined) => {
    const res = await fetch(`${baseUrl}${versionApi}${path}`, init);
    const headerCount = res.headers.get('counter');
    const result = await res.json()
    return result;
}

export default makeRequest
