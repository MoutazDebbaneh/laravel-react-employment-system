import { Locale } from "@/enums/app_enums";
import { Job, JobApplication } from "@/types";

export default function ApplicationCard({
    translations,
    locale,
    job,
    application,
}: {
    translations: Translations;
    locale: Locale;
    job: Job;
    application: JobApplication;
}) {
    return (
        <div className="border rounded-lg p-4 mb-3">
            <div className="flex flex-row gap-3 items-center">
                <img
                    src={application.user!.user_profile!.profile_picture}
                    alt="Profile Picture"
                    className="w-20"
                />
                <div className="flex flex-col">
                    <h4 className="text-dark-blue font-bold capitalize">
                        {`${application.user!.first_name} ${
                            application.user!.last_name
                        }`}
                    </h4>
                    <p className="capitalize text-[16px]">
                        {application.user!.user_profile!.current_position}
                    </p>
                </div>
            </div>
        </div>
    );
}
