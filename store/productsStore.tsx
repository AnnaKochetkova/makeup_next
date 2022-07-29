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
    productInfo: IProduct
}

class ProductsStore {
    products: IProduct[] | null = [];
    loading: boolean = false;
    productInfo: IProduct | null = null;
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
        console.log('constructor product store');
        
    }

    fetchProductsByBrand = async (brand: string) => {
        this.loading = true;
        console.log('fetchProductsByBrand', this);
        const result = (await client_api.productByBrand(brand)).map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })

    }

    async fetchProductsByTag (tag: string) {
        this.loading = true;
        const result = (await client_api.productByTag(tag)).map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
    }

    async fetchProductsByType (type: string) {
        this.loading = true;
        const result = (await client_api.productByProductType(type)).map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
    }

    async fetchProduct (id: string) {
        this.loading = true;
        const result = (await client_api.productById(id)).map(el => factoryProduct(el));
        runInAction(() => {
            this.productInfo = result[0];
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