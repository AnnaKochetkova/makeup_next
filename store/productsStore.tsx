import { runInAction, makeAutoObservable} from "mobx";

interface IColors{
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

class ProductsStore {
    products: IInfoProduct[] = [];
    loading: boolean = true;
    productInfo: IInfoProduct = {id: 0, api_featured_image: '', brand: '', category: '', name: '', price: '', product_colors: [{hex_value: ''}] , description: '', tag_list: [''], product_link: ''};

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
        // console.log(result, 'result from fetch')
        // const product = result.find((el: IInfoProduct) => el.id.toString() === id );
        // console.log(id, 'id')
        // console.log(product, 'product from fetch')
        runInAction(() => {
            this.productInfo = result;
            this.loading = false;
        })
    }

    deleteProducts() {
        // this.products = [];
        // this.productsBrand = [];
        this.loading = true;
    }
}

export default new ProductsStore;