import { PropsWithChildren } from "react";

export default function JobDetailsGridRow({
    children,
    title,
    content,
}: PropsWithChildren<{
    title: string;
    content: string;
}>) {
    return (
        <div className="job-info-row flex flex-row gap-[4.5rem] py-3">
            <div className="title-icon flex flex-row items-center gap-4 text-[#66789C] w-[40%]">
                {children}
                <span>{title}</span>
            </div>
            <div className="info-content w-[60%]">{content}</div>
        </div>
    );
}
