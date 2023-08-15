import {
    faUser,
    faAddressCard,
    faBriefcase,
    faBell,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import DashboardLink from "../../Common/DashboardLink";

export default function UserDashboardLinks({
    activeLink,
    translations,
}: {
    activeLink: string | null | undefined;
    translations: Translations;
}) {
    return (
        <>
            <DashboardLink
                routeName="user.info"
                activeLink={activeLink}
                linkTitle="UserInfo"
                icon={faUser}
                title={translations.userinfo.toString()}
            />
            <DashboardLink
                routeName="user.profile"
                activeLink={activeLink}
                linkTitle="UserProfile"
                icon={faAddressCard}
                title={translations.profile.toString()}
            />
            <DashboardLink
                routeName="user.applications"
                activeLink={activeLink}
                linkTitle="AppliedJobs"
                icon={faBriefcase}
                title={translations.applied.toString()}
            />
            <DashboardLink
                routeName="user.notifications"
                activeLink={activeLink}
                linkTitle="Notifications"
                icon={faBell}
                title={translations.notificationslist.toString()}
            />

            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="w-full flex items-center px-4 py-4 rounded-lg font-bold my-1 text-[17px] text-[#66789C]  hover:bg-primary-blue hover:text-white"
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-6 me-2" />
                <span className="hidden md:block">
                    {translations.logout.toString()}
                </span>
            </Link>
        </>
    );
}
