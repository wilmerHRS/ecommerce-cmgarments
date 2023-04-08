import * as Yup from "yup";

export const loginFormValidations = Yup.object().shape({
  email: Yup.string().email("Debe ingresar un email válido").required("Campo requerido"),
  password: Yup.string().required("Campo requerido")
})