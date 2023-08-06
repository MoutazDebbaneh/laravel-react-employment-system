import {
    faUser,
    faAddressCard,
    faBriefcase,
    faBell,
    faSignOutAlt,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import DashboardLink from "../../Common/DashboardLink";

export default function CompanyDashboardLinks({
    activeLink,
}: {
    activeLink: string | null | undefined;
}) {
    return (
        <>
            <DashboardLink
                routeName="user.info"
                activeLink={activeLink}
                linkTitle="UserInfo"
                icon={faUser}
                title="User Info"
            />
            <DashboardLink
                routeName="admin.requests"
                activeLink={activeLink}
                linkTitle="CompaniesRequests"
                icon={faIdCard}
                title="Companies Requests"
            />
            <DashboardLink
                routeName="user.profile"
                activeLink={activeLink}
                linkTitle="JobOpportunites"
                icon={faBriefcase}
                title="Job Opportunites"
            />
            <DashboardLink
                routeName="user.notifications"
                activeLink={activeLink}
                linkTitle="Notifications"
                icon={faBell}
                title="Notifications"
            />

            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="w-full flex items-center px-4 py-4 rounded-lg font-bold my-1 text-[17px] text-[#66789C]  hover:bg-primary-blue hover:text-white"
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-6 mr-2" />
                <span className="hidden md:block">Log Out</span>
            </Link>
        </>
    );
}
