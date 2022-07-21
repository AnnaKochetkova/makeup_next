import { runInAction, makeAutoObservable} from "mobx";

export interface IColors{
    hex_value: string,
    colour_name?: string,
}

export interface IInfoProduct {
    id: number;
    api_featured_image: string,
    brand: string,
    category: string,
    name: string,
    price: string,
    product_colors: IColors[],
    description?: string,
    tag_list?: string[],
    product_link?: string,
}

interface IData{
    products: IInfoProduct[],
    loading: boolean,
    productInfo: IInfoProduct
}

class ProductsStore {
    products: IInfoProduct[] | null = [];
    loading: boolean = true;
    productInfo: IInfoProduct | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    async fetchProducts (type: string | string[] | undefined, query: string) {
        const url = `http://makeup-api.herokuapp.com/api/v1/products.json?${query}=${type}`;
        const res = await fetch(url);
        const result = await res.json();
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
    }

    saveProduct (product: IInfoProduct) {
        this.productInfo = product;
    }

    async updateProduct (id: string | string[] | undefined) {
        const url = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
        const res = await fetch(url);
        const result = await res.json();
        runInAction(() => {
            this.productInfo = result;
            this.loading = false;
        })
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
        // this.products = [];
        // this.productsBrand = [];
        // this.hydrate({loading: true})
        this.loading = true;
    }
}

const store = new ProductsStore;


export function initializeStore(initialData = null) {
    // const _store = new ProductsStore()
  
    // If your page has Next.js data fetching methods that use a Mobx store, it will
    // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
    if (initialData !== null && initialData !== undefined) {
      store.hydrate(initialData)
    }
    // For SSG and SSR always create a new store
    
}
export default store;