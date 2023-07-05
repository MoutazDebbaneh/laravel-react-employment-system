import { PropsWithChildren } from 'react';

export default function FluidContainer({ children, className = '' }: PropsWithChildren & { className?: string }) {
    return (
        <div className={`!min-w-full !max-w-full !w-full ${className}`}> {children} </div>
    )
}
