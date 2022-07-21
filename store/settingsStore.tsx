import { runInAction, makeAutoObservable} from "mobx";

interface ISettings {
    name: string,
    id: string,
}

interface IDataStore {
    productType: ISettings[],
    categories: ISettings[],
    brands: ISettings[],
    tagsList: ISettings[]
}

const fetchFunction = async(setting: string) => {
    const res = await fetch(`https://3249-109-68-112-5.eu.ngrok.io/api/v1/${setting}?limit=100`);
    const result = await res.json()
    return result;
}

class SettingsStore {
    productType: ISettings[] | null = [];
    categories: ISettings[] | null = [];
    brands: ISettings[] | null = [];
    tagsList: ISettings[] | null = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getProductType() {
        const result = await fetchFunction('product_type');
        runInAction(() => {
            this.productType = result;
        })
        console.log(result, 'result from store');
        
    }

    async getCategories() {
        const result = await fetchFunction('category');
        runInAction(() => {
            this.categories = result;
        })
    }

    async getBrands() {
        const result = await fetchFunction('brand');
        runInAction(() => {
            this.brands = result;
        })
    }

    async getTagList() {
        const result = await fetchFunction('tag');
        runInAction(() => {
            this.tagsList = result;
        })
    }

    hydrate (data: Partial<IDataStore> | null) {
        if(!data) return;
        if (data.productType) {
            this.productType = data.productType || null;
        }
        if (data.categories) {
            this.categories = data.categories || null;
        }
        if (data.brands) {
            this.brands = data.brands || null;
        }
        if (data.tagsList) {
            this.tagsList = data.tagsList || null;
        }
    }
}

const storeSettings = new SettingsStore;

export function initializeStoreSettings(initialData = null) {
    if (initialData !== undefined && initialData !== null) {
        storeSettings.hydrate(initialData)
    }
}

export default storeSettings;