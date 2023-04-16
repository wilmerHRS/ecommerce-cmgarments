import ApiBase from "@/config/axios.config";
import { IGetAll } from "@/interfaces/global.interface";
import { ISale, ISaleC, ISaleDetail } from "@/interfaces/sale.interface";
import { AxiosResponse } from "axios";

//? crear SALE
const create = async (body: ISaleC): Promise<ISale> => {
    const response: AxiosResponse<ISale> = await ApiBase.post("/sale", body);
    return response.data
};

//? obtener SALES
const getAll = async (page = 1): Promise<IGetAll<ISale>> => {
    const res = await ApiBase.get(`/sale?limit=${8}&page=${page}`);
    return res.data;
};

//? obtener SALESDETAIL
const getSaleDetail = async (id: string, page = 1): Promise<IGetAll<ISaleDetail>> => {
    const res = await ApiBase.get(`/sale/detail/${id}?limit=${8}&page=${page}`);
    return res.data;
};

//? eliminar CATEGORIA
const _delete = async (id: string): Promise<ISale> => {
    return await ApiBase.delete(`/sale/${id}`);
};

const SaleService = {
    create,
    getSaleDetail,
    getAll,
    delete: _delete,
};

export { SaleService };