import Api from "../config/Api";
import { IImage } from "../interfaces/image.interface";
import { IGetProduct, IGetSizes, IProduct, IProductSizes } from "../interfaces/product.interface";

//? crear producto
const create = async (body: IProduct): Promise<IProduct> => {
    return await Api.post("/product", body);
};

//? Obtener imagenes por ID de PRODUCTO
const getImages = async (id: string): Promise<IImage[]> => {
  const res = await Api.get(`/product/${id}/image`);
  return res.data;
};

//? Obtener tallas relacionadas por ID de PRODUCTO
const getSizes = async (id: string): Promise<IGetSizes> => {
  return await Api.get(`/product/${id}/sizes`);
};

//? obtener producto id
const getProductid = async (id: string): Promise<IGetProduct> => {
  return await Api.get(`/product/${id}`);
};

//? obtener producto id X talla
const getProductidSize = async (id: string, size: string): Promise<IGetProduct> => {
  return await Api.get(`/product/relation/${id}/${size}`);
};

//? actualizar producto
const update = async (body: IProduct, id: string): Promise<IProduct> => {
    return await Api.put(`/product/${id}`, body);
  };
  
  //? eliminar producto
  const _delete = async (id: string): Promise<IProduct> => {
    return await Api.delete(`/product/${id}`);
  };
  
  
  const productService = {
    create,
    update,
    getImages,
    getProductid,
    getProductidSize,
    getSizes,
    delete: _delete
  };
  
  export { productService };