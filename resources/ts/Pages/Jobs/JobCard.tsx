import { Locale } from "@/enums/app_enums";
import { Job } from "@/types";
import {
    faLocationDot,
    faBriefcase,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { countries } from "countries-list";

export default function JobCard({
    locale,
    translations,
    job,
}: {
    locale: Locale;
    translations: Translations;
    job: Job;
}) {
    const formatDate = (dateString: string) => {
        let date = new Date(dateString);
        const day: string = date.getDate().toString().padStart(2, "0");
        const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
        const year: string = date.getFullYear().toString();

        // Format the date as dd-mm-yyyy
        const formattedDate: string = `${day}/${month}/${year}`;
        return formattedDate;
    };

    const formatSalary = (
        minSalary: number | null,
        maxSalary: number | null
    ) => {
        if (!minSalary && !maxSalary) return "";
        else if (minSalary && maxSalary)
            return `${minSalary.toLocaleString()} ~ ${maxSalary.toLocaleString()}`;
        else if (minSalary) return minSalary.toLocaleString();
        else return maxSalary!.toLocaleString();
    };

    if (!job.location) {
        job.location = locale == Locale.English ? "Undetermined" : "غير محدد";
    } else {
        const index = Object.keys(countries).indexOf(job.location);
        if (index != -1) {
            job.location =
                countries[job.location as keyof typeof countries].name;
        }
    }

    return (
        <div className="job-card w-full border border-[#E0E6F7] rounded-lg mb-6 bg-[#F8FAFF] p-8 hover:border-[#B4C0E0] hover:bg-white transition-all hover:-translate-y-0.5 group">
            <div className="job-card-head flex flex-row justify-between">
                <div className="job-head-info flex flex-row">
                    <div className="img-box me-4">
                        <img
                            className="object-fill w-14 rounded-md"
                            src={job.display_image as string}
                            alt=""
                        />
                    </div>
                    <div className="company-location flex flex-col content-between gap-1">
                        <a href="#">
                            <h5 className="text-dark-blue font-bold text-lg">
                                {job.company
                                    ? job.company.name
                                    : job.title!.split(" --- ").length == 2
                                    ? job.title!.split(" --- ")[1]
                                    : translations.unknown.toString()}
                            </h5>
                        </a>
                        <span className="text-[12px] text-muted">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="me-1"
                            />
                            {job.location ?? "Not Determined"}
                        </span>
                    </div>
                </div>
                <div className="job-head-tags flex flex-row-reverse gap-1 content-center items-center">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 3.67004V20.33L11.2 21.24C10.09 22.5 9.18001 22.16 9.18001 20.48V13.28H6.09001C4.69001 13.28 4.30001 12.42 5.23001 11.37L12 3.67004Z"
                            fill="#5BC694"
                        />
                        <path
                            opacity="0.4"
                            d="M18.77 12.63L12 20.33V3.67002L12.8 2.76002C13.91 1.50002 14.82 1.84002 14.82 3.52002V10.72H17.91C19.31 10.72 19.7 11.58 18.77 12.63Z"
                            fill="#5BC694"
                        />
                    </svg>

                    {job.source && (
                        <img
                            src={job.source_logo!}
                            alt={job.source.name!}
                            className="w-7"
                        />
                    )}

                    {job.job_types!.map((t: any) => (
                        <div
                            key={t.id}
                            className="job-tag px-2 py-2 bg-[#EFF3FC] rounded-md h-fit w-fit text-muted text-[13px]"
                        >
                            {locale == Locale.English ? t.name_en : t.name_ar}
                        </div>
                    ))}
                </div>
            </div>
            <div className="card-body mt-7">
                <h4 className="text-dark-blue text-2xl font-bold">
                    {job.title!.split(" --- ")[0]}
                </h4>
                <div className="job-info flex flex-row gap-3 mt-2">
                    <span className="text-[12px] text-muted">
                        <FontAwesomeIcon icon={faBriefcase} className="me-1" />
                        {locale == Locale.English
                            ? job.job_category!.name_en
                            : job.job_category!.name_ar}
                    </span>
                    <span className="text-[12px] text-muted">
                        <FontAwesomeIcon icon={faClock} className="me-1" />
                        {job.post_date
                            ? formatDate(job.post_date)
                            : formatDate(job.created_at!)}
                    </span>
                </div>
            </div>
            <div className="card-footer mt-6 mb-12">
                {formatSalary(job.min_salary!, job.max_salary!) ? (
                    <span
                        className={
                            "text-base " +
                            (locale == Locale.English
                                ? "float-left"
                                : "float-right")
                        }
                    >
                        <span className="text-primary-blue font-bold">
                            {formatSalary(job.min_salary!, job.max_salary!)} SYP
                        </span>
                        <span className="text-muted">
                            {" "}
                            {translations.monthly.toString()}
                        </span>
                    </span>
                ) : (
                    ""
                )}
                <a
                    href={route("jobs.details", job.id)}
                    className={
                        "details-btn bg-[#E0E6F7] py-2 px-5 rounded text-primary-blue text-sm group-hover:bg-primary-blue group-hover:text-white " +
                        (locale == Locale.English
                            ? "float-right"
                            : "float-left")
                    }
                >
                    {translations.details.toString()}
                </a>
            </div>
        </div>
    );
}
