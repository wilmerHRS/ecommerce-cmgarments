import * as Yup from "yup";

export const registerFormValidations = Yup.object().shape({
  names: Yup.string().required("Campo requerido"),
  first_lastname: Yup.string().required("Campo requerido"),
  second_lastname: Yup.string().required("Campo requerido"),
  dni: Yup.string().required("Campo requerido"),
  phone_number: Yup.string().required("Campo requerido"),
  email: Yup.string().email().required("Campo requerido"),
  password: Yup.string().required("Campo requerido")
})