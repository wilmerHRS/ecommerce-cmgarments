/* eslint-disable react-hooks/exhaustive-deps */
import { LoginApiResponse } from '@/interfaces/login.interface';
import { useAuthStore } from '@/store/auth.store';
import { time } from 'console';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { shallow } from "zustand/shallow";

const useAuth = () => {

  const { token, customer, setToken, setCustomer, clearAuthStore } = useAuthStore((state) => state, shallow)
  const router = useRouter();

  /**
   * Guarda los datos de logeo en el localstorage
   * @param loginData LoginApiResponse
   */
  const setLoginDataInLocalStorage = (loginData: LoginApiResponse) => {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }

  /**
   * Obtiene los datos del login del local storage
   * @returns LoginApiResponse | null
   */
  const getLoginDataFromLocalStorage = () => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) return JSON.parse(loginData);
    return null
  }

  const removeLoginDataFromLocalStorage = () => {
    localStorage.removeItem('loginData');
  }

  /**
   * Llena el estado global de autentificación con los datos del usuario
   * @param loginResponse LoginApiResponse
   */
  const authLogin = (loginResponse: LoginApiResponse) => {
    setToken(loginResponse.token)
    setCustomer(loginResponse.customer)
    setLoginDataInLocalStorage(loginResponse)
  }

  /**
   * Cierra la sesión del usuario seteando en null los datos del usuario en el estado
   */
  const authLogout = () => {
    router.push("/login")
    setTimeout(() => {
      clearAuthStore()
      removeLoginDataFromLocalStorage()
    }, 100)
  }

  useEffect(() => {
    if (!customer && !token) {
      const loginData = getLoginDataFromLocalStorage();
      if (loginData) authLogin(loginData)
    }
  }, [])

  return {
    authLogin,
    authLogout,
    token,
    customer
  };
}
export default useAuth;