import axios from "axios"

const ApiBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export default ApiBase