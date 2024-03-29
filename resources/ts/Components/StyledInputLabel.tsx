import { LabelHTMLAttributes } from "react";
export default function StyledInputLabel({
    value,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label {...props} className={`text-dark-blue text-[15px] ` + className}>
            {value ? value : children}
        </label>
    );
}
