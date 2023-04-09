import ApiBase from "@/config/axios.config"
import { CustomerResponseDto } from "@/interfaces/customer.interface"
import { LoginApiResponse, LoginForm } from "@/interfaces/login.interface"
import { RegisterForm } from "@/interfaces/register.interface"
import { AxiosResponse } from "axios"


/**
 * Registrar cliente
 * @param customer RegisterForm
 * @returns CustomerResponseDto
 */
const register = async (customer: RegisterForm) => {
  const response:AxiosResponse<CustomerResponseDto> = await ApiBase.post('/auth/register',customer);
  return response.data
}

const login = async (loginForm: LoginForm) => {
  const response:AxiosResponse<LoginApiResponse> = await ApiBase.post('/auth/login',loginForm);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login
}