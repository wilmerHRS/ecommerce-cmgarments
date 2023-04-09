import ApiBase from "@/config/axios.config";
import { IImage } from "../interfaces/image.interface";
import { IGetProduct, IGetSizes, IProduct, IProductSizes } from "../interfaces/product.interface";
import { AxiosResponse } from "axios";

//? Obtener imagenes por ID de PRODUCTO
const getImages = async (id: string): Promise<IImage[]> => {
  const response: AxiosResponse<IImage[]> = await ApiBase.get(`/product/${id}/image`);
  return response.data;
};

//? Obtener tallas relacionadas por ID de PRODUCTO
const getSizes = async (id: string): Promise<IProductSizes> => {
  const response: AxiosResponse<IProductSizes> = await ApiBase.get(`/product/${id}/sizes`);
  return response.data;
};

//? obtener producto id
const getProductid = async (id: string): Promise<IProduct> => {
  const response: AxiosResponse<IProduct> = await ApiBase.get(`/product/${id}`);
  return response.data;
};

//? obtener producto id X talla
const getProductidSize = async (id: string, size: string): Promise<IProduct> => {
  const response: AxiosResponse<IProduct> = await ApiBase.get(`/product/relation/${id}/${size}`);
  return response.data;
};

const productService = {
  getImages,
  getProductid,
  getProductidSize,
  getSizes,
};

export { productService };
