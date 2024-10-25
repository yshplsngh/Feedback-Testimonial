import React, { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  type: 'button' | 'submit';
  icon?: ReactNode;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'outlineB';
  loading?: boolean;
}

const Button = ({
  className,
  text,
  type,
  icon,
  variant = 'primary',
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={props.onClick}
      disabled={loading || props.disabled}
      className={cn(
        `group flex h-8 w-full items-center justify-center space-x-1 rounded-md px-2 text-[0.8rem] transition-all md:space-x-2 md:px-4 md:text-sm whitespace-nowrap${props.disabled || loading ? 'cursor-not-allowed bg-black' : ''} ${variant == 'primary' ? 'border-accent border-[2px] bg-black text-white hover:border-white hover:bg-white hover:text-black' : ''} ${variant == 'secondary' ? 'border-[2px] border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200' : ''} ${variant == 'success' ? 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500' : ''} ${variant == 'danger' ? 'border-red-900 bg-red-800 text-white hover:bg-red-900' : ''} ${variant == 'outlineB' ? 'border-accent hover:bg-accent border-[2px] bg-black text-white' : ''}`,
        className,
      )}
    >
      {loading ? <LoadingSpinner /> : icon ? icon : null}
      {text && <p>{text}</p>}
    </button>
  );
};
export default Button;
