import ArabicFlag from "@/Components/ArabicFlag";
import EnglishFlag from "@/Components/EnglishFlag";
import FluidContainer from "@/Utils/FluidContainer";
import { Locale, Role } from "@/enums/app_enums";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import UserLayout from "./UserLayout";

export default function NewLayout({
    children,
    translations,
    locale,
    auth,
    activeLink,
    className,
}: PropsWithChildren<{
    translations: Translations;
    locale: Locale;
    auth: any;
    activeLink?: string | null;
    className?: string | null;
}>) {
    // console.log(locale);

    const [mobileSearchText, setMobileSearchText] = useState("");

    function toggleMenu(): void {
        document.getElementById("sidebar")!.classList.toggle("open");
    }

    const activeLinkStyle =
        "text-primary-blue after:block after:w-15 after:h-[1.78px] after:bg-primary-blue";
    const inactiveLinkStyle =
        "hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue";

    return (
        <>
            <header>
                <FluidContainer>
                    <div
                        className={
                            "main-header flex justify-between mx-10 md:mx-28 py-7 items-center " +
                            (className ?? "")
                        }
                    >
                        <div className="header-left">
                            <a href={route("new-home")}>
                                <img
                                    className="w-40"
                                    src="/storage/logo.png"
                                    alt="JSeek"
                                />
                            </a>
                        </div>
                        {(!auth.user || auth.user.role != Role.Admin) && (
                            <div className="header-main hidden 2xl:flex 2xl:items-center">
                                <nav>
                                    <ul className="font-medium">
                                        <li
                                            className={
                                                "inline-block mx-6 h-full " +
                                                (activeLink == "Home"
                                                    ? activeLinkStyle
                                                    : inactiveLinkStyle)
                                            }
                                        >
                                            <a href={route("new-home")}>
                                                {translations.home.toString()}
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                "inline-block mx-6 h-full " +
                                                (activeLink == "Jobs"
                                                    ? activeLinkStyle
                                                    : inactiveLinkStyle)
                                            }
                                        >
                                            <a href={route("jobs")}>
                                                {translations.jobs.toString()}
                                            </a>
                                        </li>
                                        <li className="inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue">
                                            <a href="#">
                                                {translations.companies.toString()}
                                            </a>
                                        </li>
                                        <li className="inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue">
                                            <a href="#">
                                                {translations.about.toString()}
                                            </a>
                                        </li>
                                        <li className="inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue">
                                            <a href="#">
                                                {translations.terms.toString()}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}

                        <div className="header-right flex justify-center items-center">
                            {auth.user ? (
                                <UserLayout
                                    locale={locale}
                                    translations={translations}
                                />
                            ) : (
                                <>
                                    <div className="hidden 2xl:flex w-fit h-fit">
                                        {locale == Locale.English ? (
                                            <>
                                                <a
                                                    href={route("new-login")}
                                                    className="bg-primary-blue px-[25px] py-[10px] rounded-lg me-2 text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all"
                                                >
                                                    {translations.login.toString()}
                                                </a>
                                                <a
                                                    href={route("new-register")}
                                                    className="bg-primary-blue px-[25px] py-[10px] rounded-lg text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all"
                                                >
                                                    {translations.register.toString()}
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <a
                                                    href={route("new-login")}
                                                    className="bg-primary-blue px-[10px] py-[10px] rounded-lg me-2 text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all"
                                                >
                                                    {translations.login.toString()}
                                                </a>
                                                <a
                                                    href={route("new-register")}
                                                    className="bg-primary-blue px-[10px] py-[10px] rounded-lg text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all"
                                                >
                                                    {translations.register.toString()}
                                                </a>
                                            </>
                                        )}
                                    </div>
                                    {locale == Locale.English ? (
                                        <Link
                                            href={route("language.set", [
                                                Locale.Arabic,
                                            ])}
                                            className="lg:ms-3 w-6 rounded mx-4 mb-1"
                                        >
                                            <ArabicFlag />
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route("language.set", [
                                                Locale.English,
                                            ])}
                                            className="ms-3 w-6 rounded"
                                        >
                                            <EnglishFlag />
                                        </Link>
                                    )}
                                </>
                            )}

                            {(!auth.user || auth.user.role != Role.Admin) && (
                                <div className="2xl:hidden">
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className="text-[1.6rem] color-muted cursor-pointer"
                                        onClick={toggleMenu}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </FluidContainer>
                {(!auth.user || auth.user.role != Role.Admin) && (
                    <div
                        className="sidebar w-[420px] bg-white fixed z-50 min-h-screen top-0 p-8 shadow-2xl transition-all ease-in -right-[420px]"
                        id="sidebar"
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="absolute right-2 top-2 text-[1.6rem] color-muted cursor-pointer"
                            onClick={toggleMenu}
                        />
                        <div className="mobile-search mb-10 mt-3">
                            <form
                                onSubmit={(_) => {
                                    document
                                        .getElementById("mobile-search-btn")
                                        ?.click();
                                }}
                                className="bg-[#f2f3f4] rounded-lg	h-12 relative pt-0 pl-4 pb-0 pr-11"
                            >
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="border-0 bg-transparent w-full h-12 pl-10 pr-[2px] focus:ring-0"
                                    value={mobileSearchText}
                                    onChange={(e) =>
                                        setMobileSearchText(e.target.value)
                                    }
                                />
                                <Link
                                    id="mobile-search-btn"
                                    as="button"
                                    className="hidden"
                                    href={route("jobs", {
                                        search: mobileSearchText,
                                    })}
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-4 top-3 text-[18px] color-muted"
                                />
                            </form>
                        </div>
                        <div className="mobile-nav ">
                            <nav>
                                <ul className="text-dark-blue text-[1.13rem] leading-none font-medium">
                                    <li className="py-4 transition-all hover:ml-1">
                                        <a href={route("new-home")}>Home</a>
                                    </li>
                                    <li className="py-4 transition-all hover:ml-1">
                                        <a href={route("jobs")}>Jobs</a>
                                    </li>
                                    <li className="py-4 transition-all hover:ml-1">
                                        <a href="#">Companies</a>
                                    </li>
                                    <li className="py-4 transition-all hover:ml-1">
                                        <a href="#">About Us</a>
                                    </li>
                                    <li className="py-4 transition-all hover:ml-1">
                                        <a href="#">Terms</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </header>
            <main>{children}</main>
        </>
    );
}
