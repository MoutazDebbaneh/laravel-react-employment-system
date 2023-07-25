import NewLayout from "@/Layouts/NewLayout";
import FluidContainer from "@/Utils/FluidContainer";
import { Locale } from "@/enums/app_enums";
import React, { PropsWithChildren } from "react";
import AdminDashboardLinks from "./AdminDashboardLinks";
import CompanyDashboardLinks from "./AdminDashboardLinks";

export default function CompanyDashboardLayout({
    children,
    status,
    locale,
    translations,
    auth,
    activeLink,
}: PropsWithChildren<{
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink?: string | null;
}>) {
    return (
        <>
            <NewLayout
                translations={translations}
                locale={locale}
                auth={auth}
                className="pt-0 pb-2 z-10 relative h-full"
            >
                <FluidContainer className="border-t -mt-5 bg-[#F5F7FC] h-full min-h-screen">
                    <div className="sidebar-container flex flex-row relative h-full">
                        <div className="flex flex-col bg-white h-full w-fit md:w-64 absolute left-0 !min-h-screen">
                            <div className="flex flex-col justify-between flex-1 mt-6">
                                <nav className="mx-2">
                                    <CompanyDashboardLinks
                                        activeLink={activeLink}
                                    />
                                    <hr className="my-5" />
                                </nav>
                            </div>
                        </div>

                        <div className="content-container py-5 md:w-[calc(100%-16rem)] w-[calc(100%-5rem)] absolute right-0 flex justify-center bg-[#F5F7FC] px-4">
                            {children}
                        </div>
                    </div>
                </FluidContainer>
            </NewLayout>
        </>
    );
}
