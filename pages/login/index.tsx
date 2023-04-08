import Input from '@/components/Form/Input';
import { LoginApiErrorResponse, LoginForm } from '@/interfaces/login.interface';
import MainLayout from '@/layouts/MainLayout';
import authService from '@/services/auth.service';
import { loginFormValidations } from '@/validations/login-form.validation';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import type { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface indexProps { }

const Login: FC<indexProps> = ({ }) => {

  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  return (
    <MainLayout title='Login'>
      <div className='h-full flex items-center justify-center'>
        <div className='bg-slate-200 p-[30px] flex flex-col gap-8  rounded-lg shadow-md m-20 w-full max-w-[400px]'>
          <h1 className='text-center text-[35px] text-gray-800 font-semibold font-poppins'>Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={loginFormValidations}
            onSubmit={
              async (values, helpers) => {
                authService.login(values)
                  .then(res => {
                    Swal.fire({
                      icon: 'success',
                      title: `${res.names} fue logeado correctamente`,
                    })
                    helpers.setSubmitting(false);
                    helpers.resetForm();
                  })
                  .catch((err: AxiosError<LoginApiErrorResponse>) => {
                    Swal.fire({
                      icon: 'error',
                      title: err.response?.data.message,
                    })
                    helpers.setSubmitting(false);
                  })
              }
            }
          >
            {
              (({ isSubmitting }) => (
                <Form>
                  <div className='flex flex-col gap-8'>
                    <div className='grid grid-rows-2 w-full gap-5'>
                      <Input label='Email' name='email' type='text' maxLength={50} autoComplete='off' />
                      <Input label='Password' name='password' type='password' maxLength={20} autoComplete='off' />
                    </div>
                    <div className='flex'>
                      <button type='submit' className='bg-blue-600 bg-opacity-90 hover:bg-opacity-100 h-11 rounded-sm text-white text-[17px] flex justify-center items-center disabled:saturate-50 w-full' disabled={isSubmitting}>
                        {
                          isSubmitting ?
                            <FaSpinner className='animate-spin' />
                            :
                            'Send'
                        }
                      </button>
                    </div>
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
export default Login;