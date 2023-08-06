import { Locale } from "@/enums/app_enums";
import { CompanyVerificationRequest, Job, JobApplication } from "@/types";
import CompanyDashboardLayout from "../Partials/CompanyDashboardLayout";
import ApplicationCard from "./Partials/ApplicationCard";
import { Link } from "@inertiajs/react";

interface applicationsListProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    applications: JobApplication[];
    job: Job;
}

export default function ApplicationsList({
    locale,
    translations,
    auth,
    activeLink,
    applications,
    job,
}: applicationsListProps) {
    return (
        <CompanyDashboardLayout
            locale={locale}
            translations={translations}
            auth={auth}
            activeLink={activeLink}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Job Applications
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                View recieved applications for{" "}
                                <span className="capitalize">{job.title}</span>{" "}
                                position.
                            </p>
                        </header>

                        <div className="mt-5 relative">
                            {applications.length == 0
                                ? "There aren't any applications to show right now."
                                : applications.map((a, index) => (
                                      <Link
                                          key={index}
                                          href={route(
                                              "company.application.show",
                                              a.id
                                          )}
                                          className="relative hover:-translate-y-0.5 transition-all"
                                      >
                                          <ApplicationCard
                                              translations={translations}
                                              locale={locale}
                                              job={job}
                                              application={a}
                                          />
                                      </Link>
                                  ))}
                        </div>
                    </section>
                </div>
            </div>
        </CompanyDashboardLayout>
    );
}
