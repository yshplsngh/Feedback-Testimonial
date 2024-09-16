import React, { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  loading?: boolean;
}

const Button = ({
  className,
  text,
  icon,
  variant = 'primary',
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={'button'}
      onClick={props.onClick}
      disabled={loading || props.disabled}
      className={`group flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 text-sm transition-all ${props.disabled || loading ? 'cursor-not-allowed border-gray-200 bg-black text-gray-400' : ''} ${variant == 'primary' ? 'bg-black text-white hover:bg-white hover:text-black' : ''} ${variant == 'secondary' ? 'border-1 border-gray-100 bg-white text-gray-600 hover:bg-gray-100' : ''} ${variant == 'success' ? 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500' : ''} ${variant == 'danger' ? 'border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500' : ''} ${variant == 'outline' ? 'border-accent hover:bg-accent border-[2px] bg-black text-white' : ''} ${className} `}
    >
      {loading ? <LoadingSpinner /> : icon ? icon : null}
      {text && <p>{text}</p>}
    </button>
  );
};
export default Button;
