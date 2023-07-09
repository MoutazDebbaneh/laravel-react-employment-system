import PageLocalizer from '@/Components/PageLocalizer';
import Pagination from '@/Components/Pagination';
import NewLayout from '@/Layouts/NewLayout';
import FluidContainer from '@/Utils/FluidContainer';
import { Locale } from '@/enums/app_enums';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import '../../../css/animation.css';
import JobCard from './JobCard';
import NewTextInput from '@/Components/NewTextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@/Components/Checkbox';


export default function Jobs({ locale, translations, jobs, filters, perPage, search, category, current_order, types, internal, auth }: {
    locale: Locale,
    translations: Translations,
    jobs: any,
    filters: any,
    perPage: number,
    search: string | null,
    category: string | null,
    test_job: any,
    current_order: 'newest' | 'oldest',
    types: any,
    internal: boolean | null,
    auth: any
}) {

    const updateQueryParams = (key: string, value: string | string[] | number[]) => {
        const currentSearchParams = new URLSearchParams(window.location.search);
        if (typeof value === 'string') {
            currentSearchParams.set(key, value);
        }
        else {
            if (currentSearchParams.has(key))
                currentSearchParams.delete(key);
            value.forEach((v) => {
                currentSearchParams.append(key, v.toString());
            });
        }
        const newSearchString = currentSearchParams.toString();
        window.history.pushState(null, '', `?${newSearchString}`);
    }

    const [currentPage, setCurrentPage] = useState<number>(jobs.current_page);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateQueryParams('page', page.toString());
        window.location.reload();
    };

    const [currentSearch, setCurrentSearch] = useState<string>(search ?? '');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(event.target.value);
    };

    const [selectedCategory, setSelectedCategory] = useState<number>(category != null ? parseInt(category) : 0);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(parseInt(event.target.value));
    };

    const [selectedInternal, setSelectedInternal] = useState<boolean>(internal ?? false);

    const handleInternalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedInternal(!selectedInternal);
    };

    const [order, setOrder] = useState<'newest' | 'oldest'>(current_order);

    const handleChangeOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOrder = event.target.value as typeof order;
        setOrder(selectedOrder);
        updateQueryParams('order', selectedOrder);
        window.location.reload();
    };

    const [selectedTypes, setSelectedTypes] = useState<number[]>(types ? types.map((t: string) => parseInt(t)) : []);

    function handleTypeChange(type: number, checked: boolean) {
        if (checked) {
            setSelectedTypes([...selectedTypes, type]);
        } else {
            setSelectedTypes(selectedTypes.filter((item) => item !== type));
        }
    }

    function handleApplyFilterClick() {
        updateQueryParams('search', currentSearch);
        updateQueryParams('category', selectedCategory.toString());
        updateQueryParams('type[]', selectedTypes);
        updateQueryParams('internal', selectedInternal ? '1' : '0');
        window.location.reload();
    }

    function handleResetClick() {
        const currentSearchParams = new URLSearchParams();
        const newSearchString = currentSearchParams.toString();
        window.history.pushState(null, '', `?${newSearchString}`); ('');
        window.location.reload();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleApplyFilterClick();
        }
    };

    console.log(jobs.data);


    return (
        <NewLayout locale={locale} translations={translations.navbar as Translations} auth={auth}>

            <PageLocalizer locale={locale} />
            <Head title={translations.title.toString()} />
            <FluidContainer className='max-w-full lg:px-32'>

                <div className="flex flex-col md:flex-row gap-1">
                    <div className="w-full md:w-1/4 p-4 mt-[10px]">
                        <div className="filter-block mb-8 pb-3 border-b border-b-[#B4C0E0] flex justify-between items-center">
                            <h5 className='text-dark-blue font-bold text-2xl'>{translations.filter.toString()}</h5>
                            <a className={"link-reset text-[0.9rem] text-[#66789C] " + locale == Locale.English ? 'float-right' : 'float-left'} href="#" onClick={handleResetClick}>{translations.reset.toString()}</a>
                        </div>
                        <div className="filter-group mb-6">
                            <h5 className='text-dark-blue font-semibold mb-3 text-[18px] ms-1'>{translations.search.toString()}</h5>
                            <div className="search-filter">
                                <div className="search-box border border-[#E0E6F7] flex flex-row items-center ps-3 rounded">
                                    <FontAwesomeIcon icon={faSearch} className='text-[#A0ABB8]' />
                                    <NewTextInput
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
                        <div className="filter-group mb-6">
                            <h5 className='text-dark-blue font-semibold mb-3 text-[18px] ms-1'>{translations.category.toString()}</h5>
                            <div className="category-filter border border-[#E0E6F7] flex flex-row items-center ps-3 rounded">
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.99628 12.5073V10.6045" stroke="#A0ABB8" strokeWidth="1.15909" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.6423 3.99769C14.9098 3.99769 15.9298 5.02519 15.9298 6.29269V8.87269C14.0848 9.95269 11.6473 10.6052 8.99232 10.6052C6.33732 10.6052 3.90732 9.95269 2.06232 8.87269V6.28519C2.06232 5.01769 3.08982 3.99769 4.35732 3.99769H13.6423Z" stroke="#A0ABB8" strokeWidth="1.15909" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.6213 3.99427V3.71977C11.6213 2.80477 10.8788 2.06227 9.96378 2.06227H8.02878C7.11378 2.06227 6.37128 2.80477 6.37128 3.71977V3.99427" stroke="#A0ABB8" strokeWidth="1.15909" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.08087 11.6125L2.22262 13.4942C2.31862 14.7625 3.37537 15.7427 4.64662 15.7427H13.3459C14.6171 15.7427 15.6739 14.7625 15.7699 13.4942L15.9116 11.6125" stroke="#A0ABB8" strokeWidth="1.15909" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <select onChange={handleCategoryChange} value={selectedCategory} className="w-full block h-[50px] border-none text-[#A0ABB8] focus:text-black focus:shadow-none focus:ring-0 text-[15px]" id="role" name="role">
                                    <option key='0' value='0' >{translations.all.toString()}</option>
                                    {filters.categories.map((c: any) =>
                                        <option
                                            key={c.id}
                                            value={c.id} >
                                            {locale == Locale.English ? c['name_en'] : c['name_ar']}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="filter-group mb-6">
                            <h5 className='text-dark-blue font-semibold mb-3 text-[18px] ms-1'>{translations.type.toString()}</h5>
                            <div className="type-filter flex flex-col">
                                {
                                    filters.types.map((t: any) =>
                                        <div className="type-box mb-3 flex items-center" key={t.id}>
                                            <Checkbox
                                                value={t.id}
                                                onChange={(e) => handleTypeChange(parseInt(e.target.value), e.target.checked)}
                                                checked={selectedTypes.includes(t.id)}
                                                className='w-[22px] h-[22px]'
                                            />
                                            <span className="text-[#4F5E64] ms-3">
                                                {locale == Locale.English ? t['name_en'] : t['name_ar']}
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="filter-group mb-6">
                            <h5 className='text-dark-blue font-semibold mb-3 text-[18px] ms-1'>{translations.source.toString()}</h5>

                            <Checkbox
                                value='internal'
                                onChange={handleInternalChange}
                                checked={selectedInternal ? true : false}
                                className='w-[22px] h-[22px]'
                            />
                            <span className="text-[#4F5E64] ms-3">{translations.disable.toString()}</span>

                        </div>

                        <button onClick={handleApplyFilterClick} className="w-full block bg-dark-blue border border-solid border-[#E0E6F7] rounded-[4px] py-3 mt-2 text-white text-[15px] hover:bg-primary-blue hover:-translate-y-0.5 transition-all">
                            {translations.apply.toString()}
                        </button>

                    </div>

                    <div className="w-full md:w-3/4 p-4">
                        <div className="results-head w-ful flex justify-between items-center mb-8 pb-1 border-b border-b-[#E0E6F7]">
                            <p className="text-sm text-gray-700">
                                {translations.showing.toString()} <span className="font-bold">{perPage * (currentPage - 1) + 1}</span> - {' '}
                                <span className="font-bold">
                                    {Math.min(jobs.total, perPage * currentPage)}
                                </span>{' '}
                                {translations.of.toString()} <span className="font-bold">{jobs.total}</span> {translations.results.toString()}
                            </p>
                            <select onChange={handleChangeOrder} value={order} className="w-fit block h-[50px] border-none text-[#A0ABB8] focus:text-black focus:shadow-none focus:ring-0 text-[15px]" id="sort-date" name="sort-date">
                                <option value='newest'>{translations.newest.toString()}</option>
                                <option value='oldest'>{translations.oldest.toString()}</option>
                            </select>

                        </div>

                        {jobs.data.map((job: any) =>
                            <JobCard key={job.id}
                                locale={locale}
                                translations={translations}
                                job={job} />
                        )}

                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    lastPage={jobs.last_page}
                    perPage={perPage}
                    total={jobs.total}
                    onChange={handlePageChange}
                />
            </FluidContainer>


        </NewLayout>

    )
}