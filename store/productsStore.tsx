import { action, runInAction, makeObservable, observable} from "mobx";
import { useRef } from "react";
import client_api from "../utils/client_api";
import { factoryProduct } from "../utils/factoryProduct";
import { IProduct } from "../utils/types";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined');

interface IData{
    products: IProduct[],
    loading: boolean,
    productInfo: IProduct,
    counterProduct: number,
}

class ProductsStore {
    products: IProduct[] | null = [];
    loading: boolean = false;
    productInfo: IProduct | null = null;
    counterProduct: number = 0;
    constructor() {
        makeObservable(this, {
            products: observable,
            productInfo: observable,
            loading: observable,
            fetchProductsByBrand: action,
            fetchProductsByTag: action,
            fetchProductsByType: action,
            fetchProduct: action,
            saveProduct: action,
            hydrate: action,
        });
        
    }

    fetchProductsByBrand = async (brand: string, page?: number) => {
        this.loading = true;
        const [product, {counter}] = await client_api.productByBrand(brand, (page || 0) * 12 );
        const result = product.map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.counterProduct = Number(counter)
            this.loading = false;
        })

    }

    async fetchProductsByTag (tag: string, page?: number) {
        this.loading = true;
        const [product, {counter}] = await client_api.productByTag(tag, (page || 0) * 12 );
        const result = product.map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.counterProduct = Number(counter)
            this.loading = false;
        })
    }

    async fetchProductsByType (type: string, page?: number) {
        this.loading = true;
        const [product, {counter}] = await client_api.productByProductType(type, (page || 0) * 12 );
        const result = product.map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.counterProduct = Number(counter)
            this.loading = false;
        })
    }

    async fetchProduct (id: string) {
        this.loading = true;
        const result = factoryProduct(await client_api.productById(id));
        runInAction(() => {
            this.productInfo = result;
            this.loading = false;
        })
    }

    saveProduct (product: IProduct) {
        this.productInfo = product;
    }

    hydrate (data: Partial<IData> | null) {
        if(!data) return;
        if (data.products) {
          this.products = data.products || null;
        }
        if (!!data.loading) {
            this.loading = !!data.loading;
        }
        if (data.productInfo) {
            this.productInfo = data.productInfo || null;
        }
        if (data.counterProduct) {
            this.counterProduct = data.counterProduct || 0;
        }
    }
}

const store = new ProductsStore;

export const useStoreProduct = () => {
    const refStore = useRef(store);
    return refStore.current;
}


export function initializeStore(initialData = null) {
    if (initialData !== null && initialData !== undefined) {
      store.hydrate(initialData)
    }
}
export default store;