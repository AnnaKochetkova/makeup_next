import { runInAction, makeAutoObservable} from "mobx";

interface IColors{
    hex_value: string
}

export interface IBlush {
    id: string;
    api_featured_image: string,
    brand: string,
    category: string,
    name: string,
    price: string,
    product_colors: IColors[]
}

class ProductsStore {
    products: IBlush[] = [];
    productsBrand: IBlush[] = [];
    brand: string | string[] | undefined = '';
    loading: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProducts (type: string | string[] | undefined) {
        const url = `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`;
        const res = await fetch(url);
        const result = await res.json();
        runInAction(() => {
            this.products = result;
            this.loading = false;
        })
        
        
        
    }

    async fetchProductsByBrend (brand: string | string[] | undefined) {
        const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`;
        const res = await fetch(url);
        const result = await res.json();
        runInAction(() => {
            this.productsBrand = result;
            this.loading = false;
        })
        
        
    }

    saveBrand(brand: string | string[] | undefined) {
        this.brand = brand;
        console.log(this.brand, 'this.brand')
    }

    deleteProducts() {
        // this.products = [];
        // this.productsBrand = [];
        this.loading = true;
    }
}

export default new ProductsStore;