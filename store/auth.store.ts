import { CustomerResponseDto } from "@/interfaces/customer.interface"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AuthStore {
  customer: CustomerResponseDto | null
  token: string | null
  setCustomer: (customer: CustomerResponseDto) => void
  setToken: (token: string) => void
  clearAuthStore: () => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      customer: null,
      token: null,
      setCustomer(customer: CustomerResponseDto) {
        set(state => (
          { ...state, customer }
        ))
      },
      setToken(token: string) {
        set(state => (
          {...state, token }
        ))
      },
      clearAuthStore() {
        set(state => (
          {
            ...state,
            customer: null,
            token: null
          }
        ))
      }
    })
  )
)