import { runInAction, makeAutoObservable} from "mobx";
import client_api from "../utils/client_api";
import { factoryProduct } from "../utils/factoryProduct";
import { IProduct } from "../utils/types";

interface IData{
    products: IProduct[],
    loading: boolean,
    productInfo: IProduct
}

class ProductsStore {
    products: IProduct[] | null = [];
    loading: boolean = true;
    productInfo: IProduct | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    async fetchProductsByBrand (brand: string) {
        //@ts-ignore
        const result = (await client_api.productByBrand(brand)).map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
    }

    async fetchProductsByTag (tag: string) {
        //@ts-ignore
        const result = (await client_api.productByTag(tag)).map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
    }

    async fetchProductsByType (type: string) {
        //@ts-ignore
        const result = (await client_api.productByProductType(type)).map(el => factoryProduct(el));
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
    }

    async fetchProduct (id: string) {
        //@ts-ignore
        const result = (await client_api.productById(id));
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

    deleteProducts() {
        this.loading = true;
    }
}

const store = new ProductsStore;


export function initializeStore(initialData = null) {
    if (initialData !== null && initialData !== undefined) {
      store.hydrate(initialData)
    }
}
export default store;