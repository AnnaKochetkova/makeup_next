import { runInAction, makeObservable, observable} from "mobx";
import { ISettings } from "../utils/types";



interface IDataStore {
    productType: ISettings[],
    categories: ISettings[],
    brands: ISettings[],
    tagsList: ISettings[]
}


class SettingsStore {
    productType: ISettings[] | null = [];
    categories: ISettings[] | null = [];
    brands: ISettings[] | null = [];
    tagsList: ISettings[] | null = [];

    constructor() {
        makeObservable(this, {
            productType: observable,
            categories: observable,
            brands: observable,
            tagsList: observable,
        });
    }

    hydrate (data: Partial<IDataStore> | null) {
        
        if(!data) return;
        if (data.productType) {
            runInAction(() => {
                this.productType = data.productType || null;
            })
            
        };
        if (data.categories) {
            runInAction(() => {
                this.categories = data.categories || null;
            })
            
        };
        if (data.brands) {
            runInAction(() => {
                this.brands = data.brands || null;
            })
            
        };
        if (data.tagsList) {
            runInAction(() => {
                this.tagsList = data.tagsList || null;
            })
            
        };
    }
}

const storeSettings = new SettingsStore;

export function initializeStoreSettings(initialData = null) {
    if (initialData !== undefined && initialData !== null) {
        storeSettings.hydrate(initialData)
    }
}

export default storeSettings;