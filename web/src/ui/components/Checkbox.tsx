import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLInputElement> {
  text?: string;
}

const Checkbox = ({ text, ...props }: Props) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center"
        htmlFor={text?.split(' ').join('')}
      >
        <input
          type="checkbox"
          onClick={props.onClick}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-cyan-300 shadow transition-all checked:border-cyan-800 checked:bg-cyan-800 hover:shadow-md"
          id={text?.split(' ').join('')}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="ml-3 cursor-pointer text-sm text-white"
        htmlFor={text?.split(' ').join('')}
      >
        {text}
      </label>
    </div>
  );
};
export default Checkbox;
