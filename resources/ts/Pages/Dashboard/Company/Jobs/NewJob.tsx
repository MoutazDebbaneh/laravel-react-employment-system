import PrimaryButton from "@/Components/PrimaryButton";
import { Job, JobCategory, JobType } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";
import JobForm from "./JobForm";
import CompanyDashboardLayout from "../Partials/CompanyDashboardLayout";
import { Locale } from "@/enums/app_enums";

const NewJob: React.FC<{
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink?: string | null;
    categories: JobCategory[];
    types: JobType[];
}> = ({
    status,
    locale,
    translations,
    auth,
    activeLink,
    categories,
    types,
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
                                New Job
                            </h2>
                        </header>
                        <JobForm
                            edit={false}
                            routeName="company.jobs.store"
                            categories={categories}
                            types={types}
                        />
                    </section>
                </div>
            </CompanyDashboardLayout>
        </>
    );
};

export default NewJob;
