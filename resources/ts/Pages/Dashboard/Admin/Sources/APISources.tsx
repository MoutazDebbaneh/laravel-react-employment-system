import { Locale } from "@/enums/app_enums";
import { APISource } from "@/types";
import AdminDashboardLayout from "../Partials/AdminDashboardLayout";
import APISourceRow from "./Partials/APISourceRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface apiSourcesProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    sources: APISource[];
}

export default function APISources({
    locale,
    translations,
    auth,
    activeLink,
    sources,
}: apiSourcesProps) {
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
                                API Sources
                                <a href={route("admin.apiSources.add")}>
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className="text-green-700 ms-2 text-base"
                                    />
                                </a>
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                View available external API sources.
                            </p>
                        </header>

                        <div className="mt-5">
                            {!sources
                                ? "There aren't any sources to show right now."
                                : sources.map((source) => (
                                      <APISourceRow
                                          key={source.id}
                                          apiSource={source}
                                      />
                                  ))}
                        </div>
                    </section>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
