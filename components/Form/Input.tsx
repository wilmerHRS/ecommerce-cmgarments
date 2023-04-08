import { ErrorMessage, Field } from 'formik';
import type { FC } from 'react';

interface InputProps {
  label: string
  type: string
  name: string
  twClass?: string
  autoComplete: string
  maxLength?: number
  component?: string
  rows?: string
}

const Input: FC<InputProps> = ({ name, twClass, label, autoComplete, type, maxLength, component, rows }) => {
  return (
    <div className={`flex flex-col ${twClass}`}>
      <label htmlFor={name} className="mb-2 text-[20px] font-normal text-slate-500">{label}</label>
      <Field type={type} name={name} autoComplete={autoComplete} maxLength={maxLength} component={component} rows={rows}
        className='text-[18px] font-light text-gray-800 border-b-[2.5px] border-b-blue-300 outline-none py-[2px] px-2 focus:border-b-blue-400 transition-all delay-75 bg-white min-h-[50px]'
      />
      <ErrorMessage name={name} component={'p'} className="text-red-500 ml-1 font-light" />
    </div>
  );
}
export default Input;