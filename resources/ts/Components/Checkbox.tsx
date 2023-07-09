import { InputHTMLAttributes } from 'react';
export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-primary-blue shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 ' +
                className
            }
        />
    );
}
