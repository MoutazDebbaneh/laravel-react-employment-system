import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Locale } from "@/enums/app_enums";
import { JobApplication } from "@/types";
import CompanyDashboardLayout from "../Partials/CompanyDashboardLayout";
import { Link } from "@inertiajs/react";
import EducationTable from "./Partials/EducationTable";
import Select, { components, StylesConfig } from "react-select";
import ExperienceTable from "./Partials/ExperienceTable";
import CourseTable from "./Partials/CourseTable";
import AcceptApplicationModal from "./Partials/AcceptApplicationModal";
import DeclineApplicationModal from "./Partials/DeclineApplicationModal";
import { useState } from "react";

interface applicationProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    application: JobApplication;
}

interface Option {
    label: string;
    value: string;
}

export default function Application({
    locale,
    translations,
    auth,
    activeLink,
    application,
}: applicationProps) {
    const user = application.user!;
    const profile = user.user_profile!;
    const gender = profile.gender! === 0 ? "Male" : "Female";
    let hasSocialLinks = true;
    for (const link in profile.social_link) {
        if (Object.prototype.hasOwnProperty.call(profile.social_link, link)) {
            hasSocialLinks =
                hasSocialLinks ||
                profile.social_link[link as keyof typeof profile.social_link];
        }
    }

    const primaryStyle: StylesConfig<Option[], boolean> = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "white",
            borderColor: "rgb(209 213 219 / var(--tw-border-opacity))",
        }),
    };

    const DropdownIndicator = (props: any) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <div></div>
                </components.DropdownIndicator>
            )
        );
    };

    const MultiValueRemove = (props: any) => {
        return (
            components.MultiValueRemove && (
                <components.MultiValueRemove {...props}>
                    <div></div>
                </components.MultiValueRemove>
            )
        );
    };

    const [showAcceptModal, setAcceptShowModal] = useState(false);
    const [showDeclineModal, setDeclineShowModal] = useState(false);

    const closeAcceptModal = () => setAcceptShowModal(false);
    const openAcceptModal = () => setAcceptShowModal(true);

    const closeDeclineModal = () => setDeclineShowModal(false);
    const openDeclineModal = () => setDeclineShowModal(true);

    console.log(user.user_profile);

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
                                Job Application
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                View recieved application for{" "}
                                <span className="capitalize font-bold">
                                    {application.job!.title}
                                </span>{" "}
                                position.
                            </p>
                        </header>

                        <div className="mt-5 relative">
                            <div className="name-img-links mb-5">
                                <img
                                    src={user.user_profile?.profile_picture}
                                    alt="Profile Picture"
                                    className="w-1/4 mx-auto"
                                />
                                <h4 className="text-dark-blue mx-auto text-center mt-4 text-lg">
                                    {`${user.first_name} ${user.last_name}`}
                                </h4>
                                {profile.social_link && hasSocialLinks && (
                                    <div className="social-links flex flex-row mx-auto justify-center mt-3 gap-1">
                                        {profile.social_link &&
                                            profile.social_link!.linkedin && (
                                                <Link
                                                    href={
                                                        profile.social_link!
                                                            .linkedin!
                                                    }
                                                >
                                                    <div className="social-link linkedin">
                                                        <svg
                                                            viewBox="0 0 16 16"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            className="w-9 h-9"
                                                        >
                                                            <g
                                                                id="SVGRepo_bgCarrier"
                                                                strokeWidth="0"
                                                            ></g>
                                                            <g
                                                                id="SVGRepo_tracerCarrier"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path
                                                                    fill="#0A66C2"
                                                                    d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            )}
                                        {profile.social_link &&
                                            profile.social_link!.facebook && (
                                                <Link
                                                    href={
                                                        profile.social_link!
                                                            .facebook!
                                                    }
                                                >
                                                    <div className="social-link facebook">
                                                        <svg
                                                            viewBox="0 0 48 48"
                                                            version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            fill="#000000"
                                                            className="w-9 h-9"
                                                        >
                                                            <g
                                                                id="SVGRepo_bgCarrier"
                                                                strokeWidth="0"
                                                            ></g>
                                                            <g
                                                                id="SVGRepo_tracerCarrier"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <g
                                                                    id="Icons"
                                                                    stroke="none"
                                                                    strokeWidth="1"
                                                                    fill="none"
                                                                    fillRule="evenodd"
                                                                >
                                                                    <g
                                                                        id="Color-"
                                                                        transform="translate(-200.000000, -160.000000)"
                                                                        fill="#4460A0"
                                                                    >
                                                                        <path
                                                                            d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                                                                            id="Facebook"
                                                                        ></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            )}
                                        {profile.social_link &&
                                            profile.social_link!.instagram && (
                                                <Link
                                                    href={
                                                        profile.social_link!
                                                            .instagram!
                                                    }
                                                >
                                                    <div className="social-link instagram">
                                                        <svg
                                                            viewBox="0 0 32 32"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-9 h-9"
                                                        >
                                                            <g
                                                                id="SVGRepo_bgCarrier"
                                                                strokeWidth="0"
                                                            ></g>
                                                            <g
                                                                id="SVGRepo_tracerCarrier"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <rect
                                                                    x="2"
                                                                    y="2"
                                                                    width="28"
                                                                    height="28"
                                                                    rx="6"
                                                                    fill="url(#paint0_radial_87_7153)"
                                                                ></rect>
                                                                <rect
                                                                    x="2"
                                                                    y="2"
                                                                    width="28"
                                                                    height="28"
                                                                    rx="6"
                                                                    fill="url(#paint1_radial_87_7153)"
                                                                ></rect>
                                                                <rect
                                                                    x="2"
                                                                    y="2"
                                                                    width="28"
                                                                    height="28"
                                                                    rx="6"
                                                                    fill="url(#paint2_radial_87_7153)"
                                                                ></rect>
                                                                <path
                                                                    d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                                                                    fill="white"
                                                                ></path>
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                                                                    fill="white"
                                                                ></path>
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                                                                    fill="white"
                                                                ></path>
                                                                <defs>
                                                                    <radialGradient
                                                                        id="paint0_radial_87_7153"
                                                                        cx="0"
                                                                        cy="0"
                                                                        r="1"
                                                                        gradientUnits="userSpaceOnUse"
                                                                        gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                                                                    >
                                                                        <stop stopColor="#B13589"></stop>
                                                                        <stop
                                                                            offset="0.79309"
                                                                            stopColor="#C62F94"
                                                                        ></stop>
                                                                        <stop
                                                                            offset="1"
                                                                            stopColor="#8A3AC8"
                                                                        ></stop>
                                                                    </radialGradient>
                                                                    <radialGradient
                                                                        id="paint1_radial_87_7153"
                                                                        cx="0"
                                                                        cy="0"
                                                                        r="1"
                                                                        gradientUnits="userSpaceOnUse"
                                                                        gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                                                                    >
                                                                        <stop stopColor="#E0E8B7"></stop>
                                                                        <stop
                                                                            offset="0.444662"
                                                                            stopColor="#FB8A2E"
                                                                        ></stop>
                                                                        <stop
                                                                            offset="0.71474"
                                                                            stopColor="#E2425C"
                                                                        ></stop>
                                                                        <stop
                                                                            offset="1"
                                                                            stopColor="#E2425C"
                                                                            stopOpacity="0"
                                                                        ></stop>
                                                                    </radialGradient>
                                                                    <radialGradient
                                                                        id="paint2_radial_87_7153"
                                                                        cx="0"
                                                                        cy="0"
                                                                        r="1"
                                                                        gradientUnits="userSpaceOnUse"
                                                                        gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                                                                    >
                                                                        <stop
                                                                            offset="0.156701"
                                                                            stopColor="#406ADC"
                                                                        ></stop>
                                                                        <stop
                                                                            offset="0.467799"
                                                                            stopColor="#6A45BE"
                                                                        ></stop>
                                                                        <stop
                                                                            offset="1"
                                                                            stopColor="#6A45BE"
                                                                            stopOpacity="0"
                                                                        ></stop>
                                                                    </radialGradient>
                                                                </defs>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            )}
                                        {profile.social_link &&
                                            profile.social_link!.twitter && (
                                                <Link
                                                    href={
                                                        profile.social_link!
                                                            .twitter!
                                                    }
                                                >
                                                    <div className="social-link twitter">
                                                        <svg
                                                            viewBox="0 -4 48 48"
                                                            version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            fill="#000000"
                                                            className="w-9 h-9"
                                                        >
                                                            <g
                                                                id="SVGRepo_bgCarrier"
                                                                strokeWidth="0"
                                                            ></g>
                                                            <g
                                                                id="SVGRepo_tracerCarrier"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <title>
                                                                    Twitter-color
                                                                </title>
                                                                <desc>
                                                                    Created with
                                                                    Sketch.
                                                                </desc>
                                                                <defs> </defs>
                                                                <g
                                                                    id="Icons"
                                                                    stroke="none"
                                                                    strokeWidth="1"
                                                                    fill="none"
                                                                    fillRule="evenodd"
                                                                >
                                                                    <g
                                                                        id="Color-"
                                                                        transform="translate(-300.000000, -164.000000)"
                                                                        fill="#00AAEC"
                                                                    >
                                                                        <path
                                                                            d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"
                                                                            id="Twitter"
                                                                        ></path>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            )}
                                        {profile.social_link &&
                                            profile.social_link!.telegram && (
                                                <Link
                                                    href={
                                                        profile.social_link!
                                                            .telegram!
                                                    }
                                                >
                                                    <div className="social-link telegram">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            aria-label="Telegram"
                                                            role="img"
                                                            viewBox="0 0 512 512"
                                                            fill="#000000"
                                                            className="w-9 h-9"
                                                        >
                                                            <g
                                                                id="SVGRepo_bgCarrier"
                                                                strokeWidth="0"
                                                            ></g>
                                                            <g
                                                                id="SVGRepo_tracerCarrier"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            ></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <rect
                                                                    width="512"
                                                                    height="512"
                                                                    rx="15%"
                                                                    fill="#37aee2"
                                                                ></rect>
                                                                <path
                                                                    fill="#c8daea"
                                                                    d="M199 404c-11 0-10-4-13-14l-32-105 245-144"
                                                                ></path>
                                                                <path
                                                                    fill="#a9c9dd"
                                                                    d="M199 404c7 0 11-4 16-8l45-43-56-34"
                                                                ></path>
                                                                <path
                                                                    fill="#f6fbfe"
                                                                    d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            )}
                                    </div>
                                )}
                            </div>
                            <div className="general-info border-t border-gray-200 py-5">
                                <h3 className="text-lg font-medium text-gray-900">
                                    General Info:
                                </h3>
                                <div className="form-group my-5">
                                    <InputLabel value="Email" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={user.email}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="Gender" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={gender}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="Country" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={profile.country!}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="City" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={profile.city!}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="Address" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={profile.address!}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="Languages" />
                                    <Select
                                        className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                                        value={profile.languages!.map(
                                            (lang) => ({
                                                value: lang.name_en,
                                                label:
                                                    locale == Locale.English
                                                        ? lang.name_en
                                                        : lang.name_ar,
                                            })
                                        )}
                                        components={{
                                            DropdownIndicator,
                                            MultiValueRemove,
                                        }}
                                        styles={primaryStyle}
                                        isMulti={true}
                                        isDisabled={true}
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="Skills" />
                                    <Select
                                        className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                                        value={profile.skills!.map((skill) => ({
                                            value: skill.name,
                                            label: skill.name,
                                        }))}
                                        components={{
                                            DropdownIndicator,
                                            MultiValueRemove,
                                        }}
                                        styles={primaryStyle}
                                        isMulti={true}
                                        isDisabled={true}
                                    />
                                </div>

                                <div className="form-group my-5">
                                    <InputLabel value="Website" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={profile.website ?? ""}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel value="Bio" />
                                    <textarea
                                        className="mt-1 block w-full rounded-md min-h-[8rem] shadow-sm border-gray-300"
                                        value={profile.bio!}
                                        disabled
                                    />
                                </div>
                                {profile.cv_file && (
                                    <div className="form-group my-5">
                                        <Link href={profile.cv_file as string}>
                                            <InputLabel
                                                value="Download CV File"
                                                className="cursor-pointer"
                                            />
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="education-info border-t border-gray-200 py-5">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Education:
                                </h3>
                                <div className="form-group my-5">
                                    <InputLabel value="Education Level" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={
                                            profile.education_level! + " Degree"
                                        }
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel
                                        value="Education History"
                                        className="mb-2"
                                    />
                                    <EducationTable
                                        educations={profile.educations!}
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel
                                        value="Courses"
                                        className="mb-2"
                                    />
                                    <CourseTable courses={profile.courses!} />
                                </div>
                            </div>
                            <div className="professional-info border-t border-gray-200 py-5">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Professional Info:
                                </h3>
                                <div className="form-group my-5">
                                    <InputLabel value="Current Position" />
                                    <TextInput
                                        className="mt-1 block w-full"
                                        value={profile.current_position!}
                                        disabled
                                    />
                                </div>
                                <div className="form-group my-5">
                                    <InputLabel
                                        value="Work Experience"
                                        className="mb-2"
                                    />
                                    <ExperienceTable
                                        experiences={profile.experiences!}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-row justify-center">
                                <button
                                    onClick={openDeclineModal}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={openAcceptModal}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-800 focus:bg-green-800 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </section>
                    <DeclineApplicationModal
                        applicationId={application.id}
                        showModal={showDeclineModal}
                        handleClose={closeDeclineModal}
                    />
                    <AcceptApplicationModal
                        applicationId={application.id}
                        showModal={showAcceptModal}
                        handleClose={closeAcceptModal}
                    />
                </div>
            </div>
        </CompanyDashboardLayout>
    );
}
