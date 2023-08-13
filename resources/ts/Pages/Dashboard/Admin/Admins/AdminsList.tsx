import { Locale } from "@/enums/app_enums";
import { CompanyVerificationRequest, User } from "@/types";
import AdminDashboardLayout from "../Partials/AdminDashboardLayout";
import AdminListRow from "./Partials/AdminListRow";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface adminsListProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    admins: User[];
}

export default function AdminsList({
    locale,
    translations,
    auth,
    activeLink,
    admins,
}: adminsListProps) {
    return (
        <AdminDashboardLayout
            auth={auth}
            locale={locale}
            translations={translations}
            activeLink={activeLink}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Admins
                                <a href={route("admin.add")}>
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className="text-green-700 ms-2 text-base"
                                    />
                                </a>
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                View sites admins.
                            </p>
                        </header>

                        <div className="mt-5">
                            {!admins.length
                                ? "There aren't any admins to show right now."
                                : admins.map((admin) => (
                                      <AdminListRow
                                          key={admin.id}
                                          admin={admin}
                                      />
                                  ))}
                        </div>
                    </section>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
