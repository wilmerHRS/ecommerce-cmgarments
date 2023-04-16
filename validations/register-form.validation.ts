import * as Yup from "yup";

export const registerFormValidations = Yup.object().shape({
  names: Yup.string().required("Campo requerido"),
  first_lastname: Yup.string().required("Campo requerido"),
  second_lastname: Yup.string().required("Campo requerido"),
  dni: Yup.number().typeError("Debe der un Número").required("Campo requerido"),
  phone_number: Yup.number().typeError("Debe der un Número").required("Campo requerido"),
  email: Yup.string().email().required("Campo requerido"),
  password: Yup.string().required("Campo requerido")
})