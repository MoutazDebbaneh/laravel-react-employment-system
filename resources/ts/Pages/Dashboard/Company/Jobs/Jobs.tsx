import { Locale } from "@/enums/app_enums";
import CompanyDashboardLayout from "../Partials/CompanyDashboardLayout";
import { Job } from "@/types";
import JobsList from "./Partials/JobsList";

export default function CompanyInformation({
    status,
    locale,
    translations,
    auth,
    activeLink,
    jobs,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink?: string | null;
    jobs: Job[];
}) {
    return (
        <>
            <CompanyDashboardLayout
                locale={locale}
                translations={translations}
                auth={auth}
                activeLink={activeLink}
            >
                <div className="w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    <JobsList initialData={jobs} />
                </div>
            </CompanyDashboardLayout>
        </>
    );
}
