import { Locale, Role } from "@/enums/app_enums";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UserDashboardLayout from "../../User/Partials/UserDashboardLayout";
import CompanyDashboardLayout from "../../Company/Partials/CompanyDashboardLayout";

export default function UserInfo({
    status,
    locale,
    translations,
    auth,
    activeLink,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
}) {
    return (
        <>
            {auth.user.role == Role.User ? (
                <UserDashboardLayout
                    locale={locale}
                    translations={translations}
                    auth={auth}
                    activeLink={activeLink}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={true}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </UserDashboardLayout>
            ) : (
                <CompanyDashboardLayout
                    locale={locale}
                    translations={translations}
                    auth={auth}
                    activeLink={activeLink}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={false}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </CompanyDashboardLayout>
            )}
        </>
    );
}
