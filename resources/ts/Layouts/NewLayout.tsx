import ApplicationLogo from '@/Components/ApplicationLogo';
import ArabicFlag from '@/Components/ArabicFlag';
import EnglishFlag from '@/Components/EnglishFlag';
import FluidContainer from '@/Utils/FluidContainer';
import { Locale } from '@/enums/app_enums';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import UserLayout from './UserLayout';

export default function NewLayout({ children, translations, locale, auth }: PropsWithChildren<{
    translations: Translations;
    locale: Locale;
    auth: any;
}>) {

    function toggleMenu(): void {
        document.getElementById('sidebar')!.classList.toggle('open')
    }

    return (
        <>
            <header>
                <FluidContainer>
                    <div className="main-header flex justify-between mx-10 md:mx-28 py-7">
                        <div className="header-left">
                            <a href="#">
                                <svg width="154" height="40" viewBox="0 0 139 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 10.3508L14.5 2V19.6126L0 27.2042V10.3508Z" fill="#91A9FF" />
                                    <path d="M28.9241 10.3508L14.4241 2V19.6126L28.9241 27.2042V10.3508Z" fill="#5E81FF" />
                                    <path d="M14.4241 19.6126L28.9241 27.2042L14.4241 34.7958L-7.23942e-06 27.2042L14.4241 19.6126Z" fill="#3C65F5" />
                                    <path d="M35.9424 30V26.0018H37.2276C38.0843 26.0018 38.7698 25.7638 39.2838 25.2878C39.8169 24.7928 40.0835 24.1455 40.0835 23.3458V8.72374H44.5101V23.1459C44.5101 24.5167 44.215 25.7162 43.6247 26.7443C43.0345 27.7724 42.1873 28.5721 41.083 29.1432C39.9978 29.7144 38.7126 30 37.2276 30H35.9424ZM55.6332 30.3427C54.0911 30.3427 52.6822 29.9905 51.4065 29.286C50.15 28.5816 49.1409 27.6201 48.3793 26.4016C47.6368 25.1641 47.2655 23.7647 47.2655 22.2035C47.2655 20.6232 47.6368 19.2238 48.3793 18.0053C49.1409 16.7868 50.15 15.8253 51.4065 15.1209C52.6822 14.4164 54.0911 14.0642 55.6332 14.0642C57.1754 14.0642 58.5748 14.4164 59.8314 15.1209C61.088 15.8253 62.0875 16.7868 62.83 18.0053C63.5916 19.2238 63.9724 20.6232 63.9724 22.2035C63.9724 23.7647 63.5916 25.1641 62.83 26.4016C62.0875 27.6201 61.088 28.5816 59.8314 29.286C58.5748 29.9905 57.1754 30.3427 55.6332 30.3427ZM55.6332 26.4873C56.4138 26.4873 57.0897 26.3064 57.6609 25.9447C58.2511 25.5829 58.7081 25.0784 59.0317 24.431C59.3744 23.7837 59.5458 23.0412 59.5458 22.2035C59.5458 21.3657 59.3744 20.6327 59.0317 20.0044C58.7081 19.3571 58.2511 18.8526 57.6609 18.4908C57.0897 18.11 56.4138 17.9197 55.6332 17.9197C54.8526 17.9197 54.1672 18.11 53.577 18.4908C52.9868 18.8526 52.5203 19.3571 52.1776 20.0044C51.854 20.6327 51.6921 21.3657 51.6921 22.2035C51.6921 23.0412 51.854 23.7837 52.1776 24.431C52.5203 25.0784 52.9868 25.5829 53.577 25.9447C54.1672 26.3064 54.8526 26.4873 55.6332 26.4873ZM75.235 30.3427C74.1688 30.3427 73.1788 30.1523 72.2649 29.7715C71.3701 29.3717 70.6466 28.791 70.0944 28.0294L70.4943 27.1441V30H66.496V8.38104H70.7799V17.377L70.123 16.5203C70.6371 15.7397 71.332 15.1399 72.2078 14.7211C73.1026 14.2832 74.1212 14.0642 75.2636 14.0642C76.7486 14.0642 78.0909 14.426 79.2904 15.1495C80.4898 15.8729 81.4418 16.8535 82.1462 18.091C82.8507 19.3095 83.2029 20.6803 83.2029 22.2035C83.2029 23.7076 82.8507 25.0784 82.1462 26.3159C81.4608 27.5535 80.5184 28.534 79.3189 29.2575C78.1195 29.981 76.7582 30.3427 75.235 30.3427ZM74.721 26.4873C75.5206 26.4873 76.2251 26.3064 76.8343 25.9447C77.4436 25.5829 77.9195 25.0784 78.2622 24.431C78.605 23.7837 78.7763 23.0412 78.7763 22.2035C78.7763 21.3657 78.605 20.6327 78.2622 20.0044C77.9195 19.3571 77.4436 18.8526 76.8343 18.4908C76.2251 18.11 75.5206 17.9197 74.721 17.9197C73.9594 17.9197 73.274 18.1005 72.6647 18.4623C72.0745 18.824 71.6081 19.3286 71.2654 19.9759C70.9417 20.6232 70.7799 21.3657 70.7799 22.2035C70.7799 23.0412 70.9417 23.7837 71.2654 24.431C71.6081 25.0784 72.0745 25.5829 72.6647 25.9447C73.274 26.3064 73.9594 26.4873 74.721 26.4873ZM86.026 30V8.72374H95.022C96.488 8.72374 97.7446 8.97125 98.7917 9.46627C99.8389 9.96129 100.639 10.6753 101.191 11.6082C101.743 12.5221 102.019 13.6358 102.019 14.9495C102.019 15.8825 101.762 16.7773 101.248 17.6341C100.734 18.4718 99.8865 19.1762 98.7061 19.7474V17.5769C99.8294 18.0149 100.696 18.5384 101.305 19.1477C101.914 19.7569 102.333 20.4233 102.561 21.1468C102.79 21.8512 102.904 22.5938 102.904 23.3744C102.904 25.4687 102.209 27.0965 100.819 28.2579C99.4295 29.4193 97.4971 30 95.022 30H86.026ZM90.4526 26.1446H95.536C96.4309 26.1446 97.1449 25.8875 97.6779 25.3735C98.211 24.8594 98.4776 24.1931 98.4776 23.3744C98.4776 22.5367 98.211 21.8608 97.6779 21.3467C97.1449 20.8326 96.4309 20.5756 95.536 20.5756H90.4526V26.1446ZM90.4526 16.7202H95.3361C96.0215 16.7202 96.5642 16.5298 96.964 16.149C97.3828 15.7492 97.5923 15.2256 97.5923 14.5783C97.5923 13.931 97.3828 13.4169 96.964 13.0361C96.5642 12.6363 96.0215 12.4364 95.3361 12.4364H90.4526V16.7202ZM113.169 30.3427C111.627 30.3427 110.218 29.9905 108.942 29.286C107.686 28.5816 106.677 27.6201 105.915 26.4016C105.173 25.1641 104.801 23.7647 104.801 22.2035C104.801 20.6232 105.173 19.2238 105.915 18.0053C106.677 16.7868 107.686 15.8253 108.942 15.1209C110.218 14.4164 111.627 14.0642 113.169 14.0642C114.711 14.0642 116.111 14.4164 117.367 15.1209C118.624 15.8253 119.623 16.7868 120.366 18.0053C121.127 19.2238 121.508 20.6232 121.508 22.2035C121.508 23.7647 121.127 25.1641 120.366 26.4016C119.623 27.6201 118.624 28.5816 117.367 29.286C116.111 29.9905 114.711 30.3427 113.169 30.3427ZM113.169 26.4873C113.95 26.4873 114.626 26.3064 115.197 25.9447C115.787 25.5829 116.244 25.0784 116.568 24.431C116.91 23.7837 117.082 23.0412 117.082 22.2035C117.082 21.3657 116.91 20.6327 116.568 20.0044C116.244 19.3571 115.787 18.8526 115.197 18.4908C114.626 18.11 113.95 17.9197 113.169 17.9197C112.388 17.9197 111.703 18.11 111.113 18.4908C110.523 18.8526 110.056 19.3571 109.713 20.0044C109.39 20.6327 109.228 21.3657 109.228 22.2035C109.228 23.0412 109.39 23.7837 109.713 24.431C110.056 25.0784 110.523 25.5829 111.113 25.9447C111.703 26.3064 112.388 26.4873 113.169 26.4873ZM122.246 30L127.701 22.1749L122.217 14.4069H127.187L131.299 20.4614H129.129L133.241 14.4069H138.21L132.727 22.1749L138.153 30H133.213L129.186 23.9455H131.242L127.215 30H122.246Z" fill="#05264E" />
                                </svg>
                            </a>
                        </div>
                        <div className="header-main hidden 2xl:flex 2xl:items-center">
                            <nav>
                                <ul className='font-medium'>
                                    <li className='inline-block mx-6 h-full text-primary-blue after:block after:w-15 after:h-[1.78px] after:bg-primary-blue'><a href={route('new-home')}>{translations.home.toString()}</a></li>
                                    <li className='inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue'><a href={route('jobs')}>{translations.jobs.toString()}</a></li>
                                    <li className='inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue'><a href="#">{translations.companies.toString()}</a></li>
                                    <li className='inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue'><a href="#">{translations.about.toString()}</a></li>
                                    <li className='inline-block mx-6 h-full hover:text-primary-blue transition hover:after:block hover:after:w-15 hover:after:h-[1.78px] hover:after:bg-primary-blue'><a href="#">{translations.terms.toString()}</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right flex justify-center items-center">

                            {
                                auth.user ?
                                    <UserLayout locale={locale} translations={translations} user={null} />
                                    :
                                    <>
                                        <div className='hidden 2xl:flex w-fit h-fit'>
                                            {locale == Locale.English ?
                                                <>
                                                    <a href={route('new-login')} className='bg-primary-blue px-[25px] py-[10px] rounded-lg me-2 text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all'>{translations.login.toString()}</a>
                                                    <a href={route('new-register')} className='bg-primary-blue px-[25px] py-[10px] rounded-lg text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all'>{translations.register.toString()}</a>
                                                </>
                                                :
                                                <>
                                                    <a href={route('new-login')} className='bg-primary-blue px-[10px] py-[10px] rounded-lg me-2 text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all'>{translations.login.toString()}</a>
                                                    <a href={route('new-register')} className='bg-primary-blue px-[10px] py-[10px] rounded-lg text-white hover:bg-dark-blue block hover:-translate-y-0.5 transition-all'>{translations.register.toString()}</a>
                                                </>
                                            }

                                        </div>
                                        {
                                            locale == Locale.English ?
                                                <Link href={route('language.set', [Locale.Arabic])} className='ms-3 w-6 rounded'>
                                                    <ArabicFlag />
                                                </Link>
                                                :
                                                <Link href={route('language.set', [Locale.English])} className='ms-3 w-6 rounded'>
                                                    <EnglishFlag />
                                                </Link>
                                        }
                                    </>

                            }




                            <div className='2xl:hidden'>
                                <FontAwesomeIcon icon={faBars} className='text-[1.6rem] color-muted cursor-pointer' onClick={toggleMenu} />
                            </div>
                        </div>
                    </div>
                </FluidContainer>
                <div className="sidebar w-[420px] bg-white fixed z-50 min-h-screen top-0 p-8 shadow-2xl transition-all ease-in -right-[420px]" id="sidebar">
                    <FontAwesomeIcon icon={faTimes} className='absolute right-2 top-2 text-[1.6rem] color-muted cursor-pointer' onClick={toggleMenu} />
                    <div className="mobile-search mb-10 mt-3">
                        <form action="" className='bg-[#f2f3f4] rounded-lg	h-12 relative pt-0 pl-4 pb-0 pr-11'>
                            <input type="search" placeholder='Search...' className='border-0 bg-transparent w-full h-12 pl-10 pr-[2px] focus:ring-0' />
                            <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-3 text-[18px] color-muted' />
                        </form>
                    </div>
                    <div className="mobile-nav ">
                        <nav>
                            <ul className='text-dark-blue text-[1.13rem] leading-none font-medium'>
                                <li className='py-4 transition-all hover:ml-1'><a href={route('new-home')}>Home</a></li>
                                <li className='py-4 transition-all hover:ml-1'><a href={route('jobs')}>Jobs</a></li>
                                <li className='py-4 transition-all hover:ml-1'><a href="#">Companies</a></li>
                                <li className='py-4 transition-all hover:ml-1'><a href="#">About Us</a></li>
                                <li className='py-4 transition-all hover:ml-1'><a href="#">Terms</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}
