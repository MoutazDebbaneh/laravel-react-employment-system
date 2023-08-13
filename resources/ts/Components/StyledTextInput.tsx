import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "w-full block border border-solid border-[#E0E6F7] rounded-[4px] h-[50px] pl-5 mt-2 text-[#A0ABB8] focus:text-black focus:shadow-none focus:ring-0 focus:border-[#B4C0E0] text-[15px]" +
                className
            }
            ref={localRef}
        />
    );
});
