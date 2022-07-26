import { runInAction, makeAutoObservable} from "mobx";
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
        makeAutoObservable(this);
    }

    hydrate (data: Partial<IDataStore> | null) {
        
        if(!data) return;
        if (data.productType) {
            this.productType = data.productType || null;
        };
        if (data.categories) {
            this.categories = data.categories || null;
        };
        if (data.brands) {
            this.brands = data.brands || null;
        };
        if (data.tagsList) {
            this.tagsList = data.tagsList || null;
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