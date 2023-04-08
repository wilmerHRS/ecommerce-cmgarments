import { CustomerResponseDto } from "./customer.interface"

export interface LoginForm {
  email: string
  password: string
}

export interface LoginApiResponse {
  customer: CustomerResponseDto
  token: string
}

export interface LoginApiErrorResponse {
  statusCode: number
  message: string
  error: string
}