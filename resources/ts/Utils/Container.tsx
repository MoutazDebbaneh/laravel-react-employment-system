import { PropsWithChildren } from 'react';

export default function Container({ children, className = '' }: PropsWithChildren & { className?: string }) {
    return (
        <div className={`px-4 max-w-full mx-auto sm:w-[750px] md:w-[970px] lg:w-[1170px] ${className}`}> {children} </div>
    )
}
