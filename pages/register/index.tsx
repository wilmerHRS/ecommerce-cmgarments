import MainLayout from '@/layouts/MainLayout';
import type { FC } from 'react';
import { Formik, Form } from "formik";
import { registerFormValidations } from '@/validations/register-form.validation';
import { RegisterForm } from '@/interfaces/register.interface';
import Input from '@/components/Form/Input';
import { FaSpinner } from 'react-icons/fa';
import authService from '@/services/auth.service';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { BadRequestError } from '@/interfaces/errors.interfaces';

interface indexProps { }

const Register: FC<indexProps> = ({ }) => {

  const initialValues: RegisterForm = {
    names: '',
    first_lastname: '',
    second_lastname: '',
    dni: '',
    phone_number: '',
    email: '',
    password: '',
  }

  return (
    <MainLayout title='Register'>
      <div className='h-full flex items-center justify-center'>
        <div className='bg-slate-200 p-[30px] flex flex-col gap-8  rounded-lg shadow-md m-20'>
          <h1 className='text-center text-[30px] text-gray-800 font-semibold font-lato'>Register form</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={registerFormValidations}
            onSubmit={
              async (values, helpers) => {
                console.log(values)
                authService.register(values)
                  .then((res) => {
                    helpers.resetForm()
                    helpers.setSubmitting(false)
                    Swal.fire({
                      icon: 'success',
                      title: `El cliente ${res.names.split(" ")[0]} ${res.first_lastname} fue registrado exitosamente.`,
                      showConfirmButton: false,
                      timer: 2500
                    })
                  })
                  .catch((err: AxiosError<BadRequestError>) => {
                    helpers.setSubmitting(false)
                    Swal.fire({
                      icon: 'error',
                      title: 'Hubo un error al registrar, compruebe que se ingresaron los datos correctamente',
                      showConfirmButton: false,
                      timer: 2500
                    })
                  })
              }
            }
          >
            {
              (({ isSubmitting }) => (
                <Form>
                  <div className='grid grid-cols-[300px_300px] gap-5'>
                    <Input label='Names' name='names' type='text' maxLength={50} autoComplete='off' />
                    <Input label='First Lastname' name='first_lastname' type='text' maxLength={50} autoComplete='off' />
                  </div>
                  <div className='grid grid-cols-[300px_300px] gap-5'>
                    <Input label='Second Lastname' name='second_lastname' type='text' maxLength={50} autoComplete='off' />
                    <Input label='Dni' name='dni' type='text' maxLength={8} autoComplete='off' />
                  </div>
                  <div className='grid grid-cols-[300px_300px] gap-5'>
                    <Input label='Phone' name='phone_number' type='text' maxLength={9} autoComplete='off' />
                    <Input label='Email' name='email' type='email' maxLength={50} autoComplete='off' />
                  </div>
                  <div className='grid grid-cols-[300px_300px] gap-5 items-end'>
                    <Input label='Password' name='password' type='password' maxLength={20} autoComplete='off' />
                    <button className='bg-blue-600 bg-opacity-90 hover:bg-opacity-100 h-11 rounded-sm text-white text-[17px] flex justify-center items-center disabled:saturate-50' disabled={isSubmitting}>
                      {
                        isSubmitting ?
                          <FaSpinner className='animate-spin' />
                          :
                          'Send'
                      }
                    </button>
                  </div>
                </Form>
              ))
            }
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
}
export default Register;