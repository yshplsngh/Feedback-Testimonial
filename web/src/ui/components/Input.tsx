import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { NewSpaceType } from '../../space/types';
import { FeedbackType } from '../../feedback/types';
import { WEB_URL } from '../../lib/manageFetch/api';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName: keyof NewSpaceType | keyof FeedbackType;
  inputError?: FieldError;
  register: UseFormRegisterReturn;
  publicSpaceName?: string;
  className?: string;
}

function camelCaseToSentenceCase(data: string) {
  let result = data.charAt(0).toUpperCase();
  for (let i = 1; i < data.length; i++) {
    const char = data.charAt(i);
    if (char === char.toUpperCase()) {
      result += ' ' + char.toUpperCase();
    } else {
      result += char;
    }
  }
  return result;
}

let Input: React.FC<InputProps> = ({
  inputName,
  inputError,
  register,
  publicSpaceName,
  className,
}: InputProps) => {
  return (
    <div className={`group relative z-0 w-full ${className} }`}>
      <input
        type="text"
        id={inputName}
        className={`block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-1.5 text-[0.85rem] text-gray-800 focus:outline-none focus:ring-0 md:text-[0.95rem] ${inputError ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-600'} peer`}
        placeholder=" "
        required
        {...register}
      />
      <label
        htmlFor={inputName}
        className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-[0.9rem] text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
      >
        {camelCaseToSentenceCase(inputName)}
      </label>

      {inputError && (
        <p className={'text-[0.7rem] text-red-500'}>{inputError?.message}</p>
      )}
      {publicSpaceName && (
        <p className={'text-[0.7rem] text-gray-500'}>
          {`Public URL: ${WEB_URL}/feedback/${publicSpaceName}`}
        </p>
      )}
    </div>
  );
};

Input = React.memo(Input);

export default Input;
