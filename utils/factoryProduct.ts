import { IProduct, IProductRequest } from "./types";

export const factoryProduct = (prod: IProduct): IProductRequest => {
    return {
        _id: prod._id,
        image_link: prod.image_link && prod.image_link !== "" ? prod.image_link: "-",
        brand: prod.brand === null ? {name: "-", _id: "-"} : prod.brand,
        category: prod.category ? prod.category : {name: "-", _id: "-"},
        name: prod.name,
        price: prod.price,
        product_colors: prod.product_colors ? prod.product_colors : [],
        description: prod.description && prod.description !== "" ? prod.description: "No description",
        tag_list:  prod.tag_list ? prod.tag_list : [],
        product_link: prod.product_link && prod.product_link !== "" ? prod.product_link: "-",
    } ;
}