import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";

export interface IGetProduct {
    totalPages: number;
    actualPage: number;
    nextPage?: number;
    prevPage?: number;
    data: IProduct;
}

export interface IGetSizes{
    totalPages: number;
    actualPage: number;
    nextPage?: number;
    prevPage?: number;
    data: IProductSizes;
}

export interface IProductSizes{
    relation_size: String[]
}

export interface IProduct {
    id_product?: string;
    name: string;
    size: string;
    color: string;
    price: number;
    stock: number;
    gender: string;
    sku: string;
    description: string;
    state?: boolean;
    stateS?: string;
    brand?: IBrand;
    id_brand?: string;
    category?: ICategory;
    id_category?: string;
    create_at?: string;
}
