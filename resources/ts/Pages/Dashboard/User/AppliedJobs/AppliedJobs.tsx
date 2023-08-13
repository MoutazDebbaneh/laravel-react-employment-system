import { Locale } from "@/enums/app_enums";
import UserDashboardLayout from "../../User/Partials/UserDashboardLayout";
import { JobApplication } from "@/types";
import AppliedJobsList from "./Partials/AppliedJobsList";

export default function AppliedJobs({
    status,
    locale,
    translations,
    auth,
    activeLink,
    applications,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    applications: JobApplication[];
}) {
    return (
        <>
            <UserDashboardLayout
                locale={locale}
                translations={translations}
                auth={auth}
                activeLink={activeLink}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                        {applications.length ? (
                            <AppliedJobsList
                                locale={locale}
                                auth={auth}
                                translations={translations}
                                applications={applications}
                            />
                        ) : (
                            <span>You haven't applied to any jobs yet.</span>
                        )}
                    </div>
                </div>
            </UserDashboardLayout>
        </>
    );
}
