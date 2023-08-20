import { Locale } from "@/enums/app_enums";
import { Company } from "@/types";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { countries } from "countries-list";

export default function CompanyCard({
    locale,
    translations,
    company,
}: {
    locale: Locale;
    translations: Translations;
    company: Company;
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

    console.log(
        countries[company.headquarters! as keyof typeof countries].name
    );

    return (
        <div className="company-card w-full border border-[#E0E6F7] rounded-lg mb-6 bg-[#F8FAFF] p-8 hover:border-[#B4C0E0] hover:bg-white transition-all hover:-translate-y-0.5 group">
            <div className="company-card-head flex flex-row justify-between">
                <div className="company-head-info flex flex-row">
                    <div className="img-box me-4">
                        <img
                            className="object-fill w-14 rounded-md"
                            src={company.logo as string}
                            alt=""
                        />
                    </div>
                    <div className="company-location flex flex-col content-between gap-1">
                        <Link href="#">
                            <h5 className="text-dark-blue font-bold text-lg">
                                {company.name}
                            </h5>
                        </Link>
                        <span className="text-[12px] text-muted">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="me-1"
                            />
                            {
                                countries[
                                    company.headquarters! as keyof typeof countries
                                ].name
                            }
                        </span>
                    </div>
                </div>
                <div className="company-head-tags flex flex-row-reverse gap-1 content-center items-center">
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
                </div>
            </div>
            <div className="card-body mt-7">
                <div className="details-row mb-4">
                    <p className="font-bold">{translations.email.toString()}</p>{" "}
                    <Link href={`mailto:${company.email}`}>
                        {company.email}
                    </Link>
                </div>

                <div className="details-row mb-4">
                    <Link href={company.website!} target="_blank">
                        <p className="font-bold">
                            {translations.website.toString()}
                        </p>{" "}
                        {company.website}
                    </Link>
                </div>
                <div className="details-row mb-4">
                    <p className="font-bold">
                        {translations.location.toString()}
                    </p>{" "}
                    {
                        countries[
                            company.headquarters! as keyof typeof countries
                        ].name
                    }
                </div>
                <div className="details-row mb-4">
                    <p className="font-bold">{translations.phone.toString()}</p>{" "}
                    {company.phone}
                </div>
            </div>
            <div className="card-footer mt-6 mb-12">
                <Link
                    href={route("jobs", {
                        company: company.id.toString(),
                    })}
                    className={
                        "details-btn bg-[#E0E6F7] py-2 px-5 rounded text-primary-blue text-sm group-hover:bg-primary-blue group-hover:text-white " +
                        (locale == Locale.English
                            ? "float-right"
                            : "float-left")
                    }
                >
                    {translations.jobs.toString()}
                </Link>
            </div>
        </div>
    );
}
