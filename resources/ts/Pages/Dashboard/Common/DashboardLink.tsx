import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function DashboardLink({
    routeName,
    activeLink,
    linkTitle,
    icon,
    title,
}: {
    routeName: string;
    activeLink: string | null | undefined;
    linkTitle: string;
    icon: IconDefinition;
    title: string;
}) {
    return (
        <Link
            href={route(routeName)}
            className={
                "w-full flex items-center px-4 py-4 rounded-lg font-bold my-1 text-[17px]" +
                (activeLink == linkTitle
                    ? " text-white bg-primary-blue"
                    : " text-[#66789C]  hover:bg-primary-blue hover:text-white")
            }
        >
            <FontAwesomeIcon icon={icon} className="w-6 me-2" />
            <span className="hidden md:block">{title}</span>
        </Link>
    );
}
