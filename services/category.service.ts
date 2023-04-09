/* eslint-disable import/no-anonymous-default-export */
import ApiBase from "@/config/axios.config"
import { IShortCategory } from "@/interfaces/category.interface"
import { IPagination } from "@/interfaces/pagination.interface"
import { AxiosResponse } from "axios"

const getCategories = async(size: number, page: number) => {
  const response: AxiosResponse<IPagination<IShortCategory[]>> = await ApiBase.get(`/category?limit=${size}&page=${page}`)
  return response.data
} 

export default {
  getCategories
}