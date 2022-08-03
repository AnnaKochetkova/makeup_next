import makeRequest, { IHeaders } from "./fetchFunction";
import { IProduct, ISettings } from "./types";


const client_api = {
    brand: async (): Promise<ISettings[]> => (await makeRequest<ISettings[]>('/brand?limit=1000'))[0],
    category: async(): Promise<ISettings[]> => (await makeRequest<ISettings[]>('/category?limit=1000'))[0],
    tag: async(): Promise<ISettings[]> => (await makeRequest<ISettings[]>('/tag?limit=1000'))[0],
    product_type: async(): Promise<ISettings[]> => (await makeRequest<ISettings[]>('/product_type?limit=1000'))[0],
    product: async(skip = 0): Promise<[IProduct[], IHeaders]> => (await makeRequest<IProduct[]>(`/product?limit=100`)), //${skip ? '&offset='+skip : ''}
    productByBrand: async(id: string, skip = 0): Promise<[IProduct[], IHeaders]> => (await makeRequest<IProduct[]>(`/product?limit=12${skip ? '&offset='+ skip : ''}&filters={"brand":"${id}"}`)), //${skip ? '&offset='+skip : ''}
    productByProductType: async(id: string, skip = 0): Promise<[IProduct[], IHeaders]> => (await makeRequest<IProduct[]>(`/product?limit=12${skip ? '&offset='+ skip : ''}&filters={"product_type":"${id}"}`)), //${skip ? '&offset='+skip : ''}
    productByTag: async(id: string, skip = 0): Promise<[IProduct[], IHeaders]> => (await makeRequest<IProduct[]>(`/product?limit=12${skip ? '&offset='+ skip : ''}&filters={"tag_list":"${id}"}`)), //${skip ? '&offset='+skip : ''}
    productById: async(id: string):Promise<IProduct> => (await makeRequest<IProduct>(`/product/${id}`))[0]
}

export const factoryBaseModal = <T = ISettings>(doc: ISettings): T => ({
    _id: doc._id,
    name: doc.name && doc.name !== "" ? doc.name: "-",
})as T

export default client_api;