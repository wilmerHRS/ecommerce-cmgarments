import { IProduct } from "./product.interface";

export interface ICustomer{
    id_customer: string;
    names: string;
    first_lastname: string;
    second_lastname: string;
    dni: string;
    phone_number: string;
    email: string;
}

export interface ISale {
    id_sale?: string;
    customer?: ICustomer;
    total_cost: string;
    is_delete: Boolean;
    create_at?: Date;
    sale_detail: ISaleDetail[];
}

export interface ISaleDetail {
    id_sale_detail?: string;
    id_sale: string;
    product: IProduct;
    units: number;
    price: number;
    is_delete: Boolean;
}

export interface ISaleC {
    id_customer: string;
    sale_details: ISaleDetailC[];
}

export interface ISaleDetailC{
    product_id: string;
    quantity: number;
    state: boolean;    
}

export interface ICartItem {
    product_id: string;
    quantity: number;
    state: boolean;
}