import { IInfoProduct } from "../store/productsStore";

const baseUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?`;

const makeRequest = async(query: string, url: string | string[] | undefined) => {
    // const url = `${baseUrl}${query}=`;
    const res = await fetch(`${baseUrl}${query}=${url}`);
    // const result = await res.json();
    return res;
}

const checkResponse = async(res: Response) => {
    if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
    }
    return await res.json();
}

const getProductsByBrand = async(type: string | string[] | undefined):Promise<IInfoProduct[]> => {
    const result = await makeRequest('brand', type);
    return checkResponse( result);
}

const getProductsByCategories = async(type: string | string[] | undefined):Promise<IInfoProduct[]> => {
    const result = await makeRequest('product_type', type);
    return checkResponse( result);
}

const getProductsByTags = async(type: string | string[] | undefined):Promise<IInfoProduct[]> => {
    const result = await makeRequest('product_tags', type);
    return checkResponse( result);
}

const getInfoByProduct = async(id: string | string[] | undefined):Promise<IInfoProduct> => {
    const url = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
        const res = await fetch(url);
        return checkResponse(res);
}

const getTagList = async() => {
    const res = await fetch(`https://3249-109-68-112-5.eu.ngrok.io/api/v1/tag?limit=100`);
    return checkResponse(res);
}

const getBrands = async() => {
    const res = await fetch(`https://3249-109-68-112-5.eu.ngrok.io/api/v1/brand?limit=100`);
    return checkResponse(res);
}

const getProductType = async() => {
    const res = await fetch(`https://3249-109-68-112-5.eu.ngrok.io/api/v1/product_type?limit=100`);
    return checkResponse(res);
}

const api = {
    getProductsByBrand,
    getProductsByCategories,
    getProductsByTags,
    getInfoByProduct,
    getTagList,
    getProductType,
    getBrands
}

export default api;