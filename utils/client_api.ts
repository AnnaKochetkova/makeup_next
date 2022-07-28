import makeRequest from "./fetchFunction";
import { IProduct, ISettings } from "./types";


const client_api = {
    brand: (): Promise<ISettings[]> => makeRequest('/brand?limit=1000'),
    brandByName: (name: string): Promise<[ISettings]> => makeRequest(`/brand?filters={"name":"${name}"}`),
    category: (): Promise<ISettings[]> => makeRequest('/category?limit=1000'),
    tag: (): Promise<ISettings[]> => makeRequest('/tag?limit=1000'),
    tagByName: (name: string): Promise<[ISettings]> => makeRequest(`/tag?filters={"name":"${name}"}`),
    product_type: (): Promise<ISettings[]> => makeRequest('/product_type?limit=1000'),
    product_typeByName: (name: string): Promise<[ISettings]> => makeRequest(`/product_type?filters={"name":"${name}"}`),
    product: (skip = 0): Promise<IProduct[]> => makeRequest(`/product?limit=100`), //${skip ? '&offset='+skip : ''}
    productByBrand: (id: string, skip = 0): Promise<IProduct[]> => makeRequest(`/product?limit=10&filters={"brand":"${id}"}`), //${skip ? '&offset='+skip : ''}
    productByProductType: (id: string, skip = 0): Promise<IProduct[]> => makeRequest(`/product?limit=10&filters={"product_type":"${id}"}`), //${skip ? '&offset='+skip : ''}
    productByTag: (id: string, skip = 0): Promise<IProduct[]> => makeRequest(`/product?limit=10&filters={"tag_list":"${id}"}`), //${skip ? '&offset='+skip : ''}
    productById: (id: string):Promise<[IProduct]> => makeRequest(`/product?limit=1&filters={"_id":"${id}"}`)
}

export const factoryBaseModal = <T = ISettings>(doc: ISettings): T => ({
    _id: doc._id,
    name: doc.name && doc.name !== "" ? doc.name: "-",
})as T

export default client_api;