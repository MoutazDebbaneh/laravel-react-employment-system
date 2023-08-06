import { Locale, Role } from "@/enums/app_enums";
import UserDashboardLayout from "../../User/Partials/UserDashboardLayout";
import CompanyDashboardLayout from "../../Company/Partials/CompanyDashboardLayout";
import AdminDashboardLayout from "../../Admin/Partials/AdminDashboardLayout";
import NotificationsList from "./Partials/NotificationsList";
import { UserNotification } from "@/types";

export default function Notifications({
    status,
    locale,
    translations,
    auth,
    activeLink,
    notifications,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    notifications: UserNotification[];
}) {
    return (
        <>
            {auth.user.role == Role.User && (
                <UserDashboardLayout
                    locale={locale}
                    translations={translations}
                    auth={auth}
                    activeLink={activeLink}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                            <NotificationsList
                                locale={locale}
                                auth={auth}
                                translations={translations}
                                notifications={notifications}
                            />
                        </div>
                    </div>
                </UserDashboardLayout>
            )}
            {auth.user.role == Role.Company && (
                <CompanyDashboardLayout
                    locale={locale}
                    translations={translations}
                    auth={auth}
                    activeLink={activeLink}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                            <NotificationsList
                                locale={locale}
                                auth={auth}
                                translations={translations}
                                notifications={notifications}
                            />
                        </div>
                    </div>
                </CompanyDashboardLayout>
            )}
            {auth.user.role == Role.Admin ||
                (auth.user.role == Role.RootAdmin && (
                    <AdminDashboardLayout
                        locale={locale}
                        translations={translations}
                        auth={auth}
                        activeLink={activeLink}
                    >
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                                <NotificationsList
                                    locale={locale}
                                    auth={auth}
                                    translations={translations}
                                    notifications={notifications}
                                />
                            </div>
                        </div>
                    </AdminDashboardLayout>
                ))}
        </>
    );
}
