import { Locale } from "@/enums/app_enums";
import AppliedJobsTable from "./AppliedJobsTable";
import { JobApplication } from "@/types";

export default function AppliedJobsList({
    status,
    locale,
    translations,
    auth,
    applications,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: Auth;
    applications: JobApplication[];
}) {
    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Applied Jobs
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Your job applications history
                </p>
            </header>

            <div className="mt-5 relative">
                <AppliedJobsTable applications={applications} />
            </div>
        </section>
    );
}
