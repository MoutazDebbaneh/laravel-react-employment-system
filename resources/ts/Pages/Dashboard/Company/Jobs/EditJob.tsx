import { Locale } from "@/enums/app_enums";
import { Job, JobCategory, JobType } from "@/types";
import React from "react";
import CompanyDashboardLayout from "../Partials/CompanyDashboardLayout";
import JobForm from "./JobForm";

const EditJob: React.FC<{
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink?: string | null;
    categories: JobCategory[];
    types: JobType[];
    job: Job;
}> = ({
    status,
    locale,
    translations,
    auth,
    activeLink,
    categories,
    types,
    job,
}) => {
    return (
        <>
            <CompanyDashboardLayout
                locale={locale}
                translations={translations}
                auth={auth}
                activeLink={activeLink}
            >
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
                    <section>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Edit Job
                            </h2>
                        </header>
                        <JobForm
                            job={job}
                            edit={true}
                            routeName="company.jobs.edit"
                            categories={categories}
                            types={types}
                        />
                    </section>
                </div>
            </CompanyDashboardLayout>
        </>
    );
};

export default EditJob;
