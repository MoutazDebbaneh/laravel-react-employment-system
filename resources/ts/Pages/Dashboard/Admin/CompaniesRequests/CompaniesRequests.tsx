import { Locale } from "@/enums/app_enums";
import { CompanyVerificationRequest } from "@/types";
import AdminDashboardLayout from "../../Admin/Partials/AdminDashboardLayout";
import CompanyRequest from "./Partials/CompanyRequest";
import Modal from "@/Components/Modal";
import { useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

interface companiesRequestsProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    requests: CompanyVerificationRequest[];
}

export default function CompaniesRequests({
    locale,
    translations,
    auth,
    activeLink,
    requests,
}: companiesRequestsProps) {
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
                                Companies Requests
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                View companies verification requests.
                            </p>
                        </header>

                        <div className="mt-5">
                            {!requests
                                ? "There aren't any new requests to show right now."
                                : requests.map((request) => (
                                      <CompanyRequest
                                          key={request.id}
                                          logo={
                                              request.company!.logo! as string
                                          }
                                          name={request.company!.name!}
                                          location={
                                              request.company!.headquarters!
                                          }
                                          phoneNumber={request.company!.phone!}
                                          website={request.company!.website!}
                                          email={request.company!.email!}
                                          requestId={request.id}
                                      />
                                  ))}
                        </div>
                    </section>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
