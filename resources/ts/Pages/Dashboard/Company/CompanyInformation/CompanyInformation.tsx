import { Locale } from "@/enums/app_enums";
import CompanyDashboardLayout from "../Partials/CompanyDashboardLayout";
import UpdateCompanyInformationForm from "./Partials/UpdateCompanyInformationForm";
import { Company } from "@/types";

export default function CompanyInformation({
    status,
    locale,
    translations,
    auth,
    activeLink,
    company,
    verificationError,
}: {
    status?: string;
    verificationError?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink?: string | null;
    company: Company;
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
                    <UpdateCompanyInformationForm
                        status={status}
                        company={company}
                        verificationError={verificationError}
                    />
                </div>
            </CompanyDashboardLayout>
        </>
    );
}
