import ApiBase from "@/config/axios.config"
import { IShortImage } from "@/interfaces/image.interface";
import { AxiosResponse } from "axios";

const getProductImage = async (id_product: string) => {
  const response:AxiosResponse<IShortImage[]> = await ApiBase.get(`/product/${id_product}/image`);
  return response.data
}

const imageService = {
  getProductImage
}

export default imageService;