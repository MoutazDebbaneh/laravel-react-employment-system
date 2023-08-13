import Checkbox from "@/Components/Checkbox";
import StyledTextInput from "@/Components/StyledTextInput";
import PageLocalizer from "@/Components/PageLocalizer";
import Pagination from "@/Components/Pagination";
import DefaultLayout from "@/Layouts/DefaultLayout";
import FluidContainer from "@/Utils/FluidContainer";
import { Locale } from "@/enums/app_enums";
import { Company } from "@/types";
import { faInstitution, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import "../../../css/animation.css";
import CompanyCard from "./CompanyCard";

interface jobsProp {
    current_page: number;
    data: Company[];
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    prev_page_url: string;
    last_page: number;
    path: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    links: {
        active: boolean;
        label: string;
        url: string;
    }[];
}

export default function CompaniesPage({
    locale,
    translations,
    companies,
    perPage,
    search,
    current_order,
    auth,
    activeLink,
}: {
    locale: Locale;
    translations: Translations;
    companies: jobsProp;
    perPage: number;
    search: string | null;
    test_job: any;
    current_order: "newest" | "oldest";
    auth: any;
    activeLink: string;
}) {
    const updateQueryParams = (
        key: string,
        value: string | string[] | number[]
    ) => {
        const currentSearchParams = new URLSearchParams(window.location.search);
        if (typeof value === "string") {
            currentSearchParams.set(key, value);
        } else {
            if (currentSearchParams.has(key)) currentSearchParams.delete(key);
            value.forEach((v) => {
                currentSearchParams.append(key, v.toString());
            });
        }
        const newSearchString = currentSearchParams.toString();
        window.history.pushState(null, "", `?${newSearchString}`);
    };

    const [currentPage, setCurrentPage] = useState<number>(
        companies.current_page
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateQueryParams("page", page.toString());
        window.location.reload();
    };

    const [currentSearch, setCurrentSearch] = useState<string>(search ?? "");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(event.target.value);
    };

    const [order, setOrder] = useState<"newest" | "oldest">(current_order);

    const handleChangeOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOrder = event.target.value as typeof order;
        setOrder(selectedOrder);
        updateQueryParams("order", selectedOrder);
        window.location.reload();
    };

    function handleApplyFilterClick() {
        updateQueryParams("search", currentSearch);
        window.location.reload();
    }

    function handleResetClick() {
        const currentSearchParams = new URLSearchParams();
        const newSearchString = currentSearchParams.toString();
        window.history.pushState(null, "", `?${newSearchString}`);
        ("");
        window.location.reload();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleApplyFilterClick();
        }
    };

    return (
        <DefaultLayout
            locale={locale}
            translations={translations.navbar as Translations}
            auth={auth}
            activeLink={activeLink}
        >
            <PageLocalizer locale={locale} />
            <Head title={translations.title.toString()} />
            <FluidContainer className="max-w-full lg:px-32">
                <div className="flex flex-col md:flex-row gap-1">
                    <div className="w-full md:w-1/4 p-4 mt-[10px]">
                        <div className="filter-block mb-8 pb-3 border-b border-b-[#B4C0E0] flex justify-between items-center">
                            <h5 className="text-dark-blue font-bold text-2xl">
                                {translations.filter.toString()}
                            </h5>
                            <a
                                className={
                                    "link-reset text-[0.9rem] text-[#66789C] " +
                                        locale ==
                                    Locale.English
                                        ? "float-right"
                                        : "float-left"
                                }
                                href="#"
                                onClick={handleResetClick}
                            >
                                {translations.reset.toString()}
                            </a>
                        </div>
                        <div className="filter-group mb-6">
                            <h5 className="text-dark-blue font-semibold mb-3 text-[18px] ms-1">
                                {translations.search.toString()}
                            </h5>
                            <div className="search-filter">
                                <div className="search-box border border-[#E0E6F7] flex flex-row items-center ps-3 rounded">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="text-[#A0ABB8]"
                                    />
                                    <StyledTextInput
                                        id="search"
                                        type="text"
                                        name="search"
                                        value={currentSearch}
                                        className="block border-none placeholder-[#A0ABB8] mt-0 !px-4"
                                        placeholder={translations.search_placeholder.toString()}
                                        autoComplete="search"
                                        onChange={handleSearchChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleApplyFilterClick}
                            className="w-full block bg-dark-blue border border-solid border-[#E0E6F7] rounded-[4px] py-3 mt-2 text-white text-[15px] hover:bg-primary-blue hover:-translate-y-0.5 transition-all"
                        >
                            {translations.apply.toString()}
                        </button>
                    </div>

                    <div className="w-full md:w-3/4 p-4">
                        <div className="results-head w-ful flex justify-between items-center mb-8 pb-1 border-b border-b-[#E0E6F7]">
                            <p className="text-sm text-gray-700">
                                {translations.showing.toString()}{" "}
                                <span className="font-bold">
                                    {perPage * (currentPage - 1) + 1}
                                </span>{" "}
                                -{" "}
                                <span className="font-bold">
                                    {Math.min(
                                        companies.total,
                                        perPage * currentPage
                                    )}
                                </span>{" "}
                                {translations.of.toString()}{" "}
                                <span className="font-bold">
                                    {companies.total}
                                </span>{" "}
                                {translations.results.toString()}
                            </p>
                            <select
                                onChange={handleChangeOrder}
                                value={order}
                                className="w-fit block h-[50px] border-none text-[#A0ABB8] focus:text-black focus:shadow-none focus:ring-0 text-[15px]"
                                id="sort-date"
                                name="sort-date"
                            >
                                <option value="newest">
                                    {translations.newest.toString()}
                                </option>
                                <option value="oldest">
                                    {translations.oldest.toString()}
                                </option>
                            </select>
                        </div>

                        {companies.data.map((company: any) => (
                            <CompanyCard
                                key={company.id}
                                locale={locale}
                                translations={translations}
                                company={company}
                            />
                        ))}
                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    lastPage={companies.last_page}
                    perPage={perPage}
                    total={companies.total}
                    onChange={handlePageChange}
                />
            </FluidContainer>
        </DefaultLayout>
    );
}
