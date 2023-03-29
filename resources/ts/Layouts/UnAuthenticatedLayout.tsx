import { PropsWithChildren, ReactNode, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import ArabicFlag from '@/Components/ArabicFlag';
import EnglishFlag from '@/Components/EnglishFlag';
import { Locale } from '@/enums/app_enums';

export default function UnAuthenticated({ header, children, locale, translations }: PropsWithChildren<{ header: ReactNode }> & { locale: Locale, translations: Translations }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    {translations.home.toString()}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="#" active={route().current('jobs')}>
                                    {translations.jobs.toString()}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="#" active={route().current('companies')}>
                                    {translations.companies.toString()}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href="#" active={route().current('about')}>
                                    {translations.about.toString()}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">

                                <a href={route('login')}>
                                    <PrimaryButton className={'mx-1' + (locale == Locale.Arabic ? ' !tracking-normal' : '')}>{translations.login.toString()}</PrimaryButton>
                                </a>

                                <a href={route('register')}>
                                    <PrimaryButton className={'mx-1' + (locale == Locale.Arabic ? ' !tracking-normal' : '')}>{translations.register.toString()}</PrimaryButton>
                                </a>

                                {
                                    locale == Locale.English ?
                                        <a href={route('language.set', [Locale.Arabic])} className='inline-flex w-7 ms-10 my-auto align-middle rounded hover:shadow-md hover:shadow-gray-700'>
                                            <ArabicFlag />
                                        </a>
                                        :
                                        <a href={route('language.set', [Locale.English])} className='inline-flex w-7 ms-10 my-auto align-middle rounded hover:shadow-md hover:shadow-gray-700'>
                                            <EnglishFlag />
                                        </a>
                                }

                            </div>
                        </div>

                        <div className="[margin-inline-end:-0.5rem] flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                Home
                            </div>
                            <div className="font-medium text-sm text-gray-500">Home</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            {
                                locale === Locale.English ?
                                    <ResponsiveNavLink href={route('language.set', [Locale.Arabic])}>
                                        Arabic
                                    </ResponsiveNavLink>
                                    :
                                    <ResponsiveNavLink href={route('language.set', [Locale.English])}>
                                        English
                                    </ResponsiveNavLink>
                            }
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
