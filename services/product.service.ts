import ApiBase from "@/config/axios.config";
import { IImage } from "../interfaces/image.interface";
import { IGetProduct, IGetSizes, IProduct, IProductSizes, IRecentProduct } from "../interfaces/product.interface";
import { AxiosResponse } from "axios";

//? crear producto
const create = async (body: IProduct): Promise<IProduct> => {
  return await ApiBase.post("/product", body);
};

//? Obtener imagenes por ID de PRODUCTO
const getImages = async (id: string): Promise<IImage[]> => {
  const res = await ApiBase.get(`/product/${id}/image`);
  return res.data;
};

//? Obtener tallas relacionadas por ID de PRODUCTO
const getSizes = async (id: string): Promise<IGetSizes> => {
  return await ApiBase.get(`/product/${id}/sizes`);
};

//? obtener producto id
const getProductid = async (id: string): Promise<IGetProduct> => {
  return await ApiBase.get(`/product/${id}`);
};

//? obtener producto id X talla
const getProductidSize = async (id: string, size: string): Promise<IGetProduct> => {
  return await ApiBase.get(`/product/relation/${id}/${size}`);
};

//? actualizar producto
const update = async (body: IProduct, id: string): Promise<IProduct> => {
  return await ApiBase.put(`/product/${id}`, body);
};

//? eliminar producto
const _delete = async (id: string): Promise<IProduct> => {
  return await ApiBase.delete(`/product/${id}`);
};


/**
 * Obteniendo los productos reciente mente registrados
 * @param quantity Number
 * @returns IRecentProducts
 */
const getRecentsProducts = async (quantity: number): Promise<IRecentProduct[]> => {
  const response: AxiosResponse<IRecentProduct[]> = await ApiBase.get(`/product/recents/items?quantity=${quantity}`)
  return response.data
}



const productService = {
  create,
  update,
  getImages,
  getProductid,
  getProductidSize,
  getSizes,
  delete: _delete,
  getRecentsProducts
};

export { productService };