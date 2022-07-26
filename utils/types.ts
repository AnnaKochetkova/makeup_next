export interface ISettings {
    name: string,
    _id: string,
}

export interface IColors{
    hex_value: string,
    colour_name?: string,
}

export interface IProduct {
    _id: string;
    image_link: string,
    brand: ISettings,
    category: ISettings,
    name: string,
    price: string,
    product_colors: IColors[],
    description?: string,
    tag_list?: ISettings[],
    product_link?: string,
}

export interface IProductRequest {
    brand: ISettings;
    category: ISettings;
    currency?: string;
    description: string;
    image_link: string;
    name: string;
    price: string;
    price_sign?: string;
    product_api_url?: string;
    product_colors: IColors[];
    product_link: string;
    product_type?: ISettings;
    rating?: null;
    tag_list: ISettings[] | undefined;
    __v?: 0;
    _id: string;
}