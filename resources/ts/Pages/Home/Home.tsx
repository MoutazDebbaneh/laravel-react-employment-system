import { Link, Head } from "@inertiajs/react";
import { Locale, Role } from "@/enums/app_enums";
import Container from "@/Utils/Container";
import "../../../css/animation.css";
import bannerImg1 from "/resources/images/banner1.png";
import bannerImg2 from "/resources/images/banner2.png";
import bottomBannerImg from "/resources/images/icon-bottom-banner.png";
import topBannerImg from "/resources/images/icon-top-banner.png";
import DefaultLayout from "@/Layouts/DefaultLayout";
import PageLocalizer from "@/Components/PageLocalizer";
import { useState } from "react";
import StyledTextInput from "@/Components/StyledTextInput";
import Select from "react-select";

export default function Home({
    locale,
    translations,
    categories,
    auth,
    activeLink,
}: {
    locale: Locale;
    translations: Translations;
    categories: { id: number; name_en: string; name_ar: string }[];
    auth: any;
    activeLink: string;
}) {
    const [category, setCategory] = useState(0);
    const [searchText, setSearchText] = useState("");

    const options = categories.map((c) => ({
        value: c.id,
        label: locale == Locale.English ? c["name_en"] : c["name_ar"],
    }));

    options.unshift({
        value: 0,
        label: translations.all.toString(),
    });

    return (
        <DefaultLayout
            locale={locale}
            translations={translations.navbar as Translations}
            auth={auth}
            activeLink={activeLink}
        >
            <PageLocalizer locale={locale} />
            <Head
                title={(translations.navbar as Translations).title.toString()}
            />

            <div className="bg-[url('/resources/images/bg-banner.svg')] bg-no-repeat bg-left-top bg-cover fixed -z-50 w-full top-0 right-0 min-h-[835px]"></div>
            <Container className="max-w-full">
                <section className="top-section mt-[4.6rem] max-w-full mx-10 lg:mx-0 grid grid-cols-1 2xl:grid-cols-2">
                    <div className="left-section">
                        <h1 className="text-[3.5rem] leading-[3.75rem] text-dark-blue font-extrabold max-w-10">
                            {translations.heading_the.toString()}
                            <span className='relative text-primary-blue after:bg-primary-blue after:block after:content-[""] after:absolute after:h-[25px] after:w-full after:left-0 after:bottom-translate-y-24 after:z-10 after:opacity-10'>
                                {translations.heading_blue_text.toString()}
                            </span>
                            <br />
                            {!auth.user || auth.user.role == Role.User
                                ? translations.heading_rest_user.toString()
                                : translations.heading_rest_company.toString()}
                        </h1>
                        <p className="text-muted text-[1.235rem] mt-5 2xl:w-full w-3/4">
                            {translations.subheading.toString()}
                        </p>
                        <div className="quick-search">
                            <div className="form-rect w-[40rem] bg-white rounded-lg my-10 shadow-xl h-16 flex items-center px-4 gap-1">
                                <span
                                    className={`z-10 ${
                                        locale == Locale.English
                                            ? "mr-[-5px]"
                                            : "ml-[-5px]"
                                    }`}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.99628 12.5073V10.6045"
                                            stroke="#A0ABB8"
                                            strokeWidth="1.15909"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.6423 3.99769C14.9098 3.99769 15.9298 5.02519 15.9298 6.29269V8.87269C14.0848 9.95269 11.6473 10.6052 8.99232 10.6052C6.33732 10.6052 3.90732 9.95269 2.06232 8.87269V6.28519C2.06232 5.01769 3.08982 3.99769 4.35732 3.99769H13.6423Z"
                                            stroke="#A0ABB8"
                                            strokeWidth="1.15909"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.6213 3.99427V3.71977C11.6213 2.80477 10.8788 2.06227 9.96378 2.06227H8.02878C7.11378 2.06227 6.37128 2.80477 6.37128 3.71977V3.99427"
                                            stroke="#A0ABB8"
                                            strokeWidth="1.15909"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M2.08087 11.6125L2.22262 13.4942C2.31862 14.7625 3.37537 15.7427 4.64662 15.7427H13.3459C14.6171 15.7427 15.6739 14.7625 15.7699 13.4942L15.9116 11.6125"
                                            stroke="#A0ABB8"
                                            strokeWidth="1.15909"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <Select
                                    id="category"
                                    name="category"
                                    className="react-select no-border w-full py-2 !ring-0 !border-none rounded-md"
                                    options={options}
                                    value={
                                        !category
                                            ? options[0]
                                            : {
                                                  value: category,
                                                  label:
                                                      locale == Locale.English
                                                          ? categories.filter(
                                                                (c) =>
                                                                    c.id ==
                                                                    category
                                                            )[0].name_en
                                                          : categories.filter(
                                                                (c) =>
                                                                    c.id ==
                                                                    category
                                                            )[0].name_ar,
                                              }
                                    }
                                    onChange={(e) => setCategory(e!.value)}
                                />
                                <span
                                    className={`z-10 ${
                                        locale == Locale.English
                                            ? "-mr-2"
                                            : "-ml-2"
                                    }`}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_30_1080)">
                                            <path
                                                d="M2.00005 3.99998C0.897217 3.99998 0 3.10298 0 2.00005C0 0.897003 0.897217 0 2.00005 0C3.10277 0 3.99998 0.897003 3.99998 2.00005C3.99998 3.10298 3.10277 3.99998 2.00005 3.99998ZM2.00005 0.999969C1.44847 0.999969 0.999969 1.44879 0.999969 2.00005C0.999969 2.5513 1.44847 3.00002 2.00005 3.00002C2.55151 3.00002 3.00002 2.5513 3.00002 2.00005C3.00002 1.44879 2.55151 0.999969 2.00005 0.999969Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M7.00002 3.99998C5.89719 3.99998 4.99997 3.10298 4.99997 2.00005C4.99997 0.897003 5.89719 0 7.00002 0C8.10284 0 9.00006 0.897003 9.00006 2.00005C9.00006 3.10298 8.10284 3.99998 7.00002 3.99998ZM7.00002 0.999969C6.44855 0.999969 6.00005 1.44879 6.00005 2.00005C6.00005 2.5513 6.44855 3.00002 7.00002 3.00002C7.55148 3.00002 7.99998 2.5513 7.99998 2.00005C7.99998 1.44879 7.55148 0.999969 7.00002 0.999969Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M12 3.99998C10.8972 3.99998 10 3.10298 10 2.00005C10 0.897003 10.8972 0 12 0C13.1028 0 14 0.897003 14 2.00005C14 3.10298 13.1028 3.99998 12 3.99998ZM12 0.999969C11.4485 0.999969 11 1.44879 11 2.00005C11 2.5513 11.4485 3.00002 12 3.00002C12.5515 3.00002 13 2.5513 13 2.00005C13 1.44879 12.5515 0.999969 12 0.999969Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M2.00005 9.00005C0.897217 9.00005 0 8.10304 0 7C0 5.89696 0.897217 4.99995 2.00005 4.99995C3.10277 4.99995 3.99998 5.89696 3.99998 7C3.99998 8.10304 3.10277 9.00005 2.00005 9.00005ZM2.00005 6.00003C1.44847 6.00003 0.999969 6.44875 0.999969 7C0.999969 7.55125 1.44847 7.99997 2.00005 7.99997C2.55151 7.99997 3.00002 7.55125 3.00002 7C3.00002 6.44875 2.55151 6.00003 2.00005 6.00003Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M7.00002 9.00005C5.89719 9.00005 4.99997 8.10304 4.99997 7C4.99997 5.89696 5.89719 4.99995 7.00002 4.99995C8.10284 4.99995 9.00006 5.89696 9.00006 7C9.00006 8.10304 8.10284 9.00005 7.00002 9.00005ZM7.00002 6.00003C6.44855 6.00003 6.00005 6.44875 6.00005 7C6.00005 7.55125 6.44855 7.99997 7.00002 7.99997C7.55148 7.99997 7.99998 7.55125 7.99998 7C7.99998 6.44875 7.55148 6.00003 7.00002 6.00003Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M12 9.00005C10.8972 9.00005 10 8.10304 10 7C10 5.89696 10.8972 4.99995 12 4.99995C13.1028 4.99995 14 5.89696 14 7C14 8.10304 13.1028 9.00005 12 9.00005ZM12 6.00003C11.4485 6.00003 11 6.44875 11 7C11 7.55125 11.4485 7.99997 12 7.99997C12.5515 7.99997 13 7.55125 13 7C13 6.44875 12.5515 6.00003 12 6.00003Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M2.00005 14C0.897217 14 0 13.103 0 12C0 10.897 0.897217 10 2.00005 10C3.10277 10 3.99998 10.897 3.99998 12C3.99998 13.103 3.10277 14 2.00005 14ZM2.00005 11C1.44847 11 0.999969 11.4487 0.999969 12C0.999969 12.5512 1.44847 13 2.00005 13C2.55151 13 3.00002 12.5512 3.00002 12C3.00002 11.4487 2.55151 11 2.00005 11Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M7.00002 14C5.89719 14 4.99997 13.103 4.99997 12C4.99997 10.897 5.89719 10 7.00002 10C8.10284 10 9.00006 10.897 9.00006 12C9.00006 13.103 8.10284 14 7.00002 14ZM7.00002 11C6.44855 11 6.00005 11.4487 6.00005 12C6.00005 12.5512 6.44855 13 7.00002 13C7.55148 13 7.99998 12.5512 7.99998 12C7.99998 11.4487 7.55148 11 7.00002 11Z"
                                                fill="#A0ABB8"
                                            />
                                            <path
                                                d="M12 14C10.8972 14 10 13.103 10 12C10 10.897 10.8972 10 12 10C13.1028 10 14 10.897 14 12C14 13.103 13.1028 14 12 14ZM12 11C11.4485 11 11 11.4487 11 12C11 12.5512 11.4485 13 12 13C12.5515 13 13 12.5512 13 12C13 11.4487 12.5515 11 12 11Z"
                                                fill="#A0ABB8"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_30_1080">
                                                <rect
                                                    width="14"
                                                    height="14"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <StyledTextInput
                                    id="search_text"
                                    type="text"
                                    name="search_text"
                                    value={searchText}
                                    className="block border-none placeholder-[#A0ABB8] !mt-0 !px-4"
                                    placeholder={translations.search_placeholder.toString()}
                                    autoComplete="search_text"
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <span>
                                    <a
                                        href={route("jobs", {
                                            search: searchText,
                                            category: category,
                                        })}
                                        className="bg-primary-blue px-[25px] py-[10px] rounded-lg me-2 text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all"
                                    >
                                        {translations.search.toString()}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="right-section hidden 2xl:block">
                        <div className="banner-imgs relative">
                            {locale == Locale.English ? (
                                <>
                                    <div className="shape-1 absolute -top-10 left-28">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={bannerImg1}
                                        />
                                    </div>
                                    <div className="shape-2 absolute top-60 left-64">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={bannerImg2}
                                        />
                                    </div>
                                    <div className="shape-3 absolute left-[25.1rem]">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={topBannerImg}
                                        />
                                    </div>
                                    <div className="shape-3 absolute left-[11.25rem] top-[23.4rem]">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={bottomBannerImg}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="shape-1 absolute -top-10 right-28">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={bannerImg1}
                                        />
                                    </div>
                                    <div className="shape-2 absolute top-60 right-64">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={bannerImg2}
                                        />
                                    </div>
                                    <div className="shape-3 absolute right-[25.1rem]">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={topBannerImg}
                                        />
                                    </div>
                                    <div className="shape-3 absolute right-[11.25rem] top-[23.4rem]">
                                        <img
                                            className="img"
                                            alt="jobBox"
                                            src={bottomBannerImg}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </Container>
        </DefaultLayout>
    );
}
