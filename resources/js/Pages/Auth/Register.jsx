import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PageLocalizer from '@/Components/PageLocalizer';

export default function Register({ locale, translations }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 3,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <PageLocalizer locale={locale} />
            <Head title={translations.title} />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="first_name" value={translations.first} />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value={translations.last} />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value={translations.email} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={translations.password} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value={translations.confirm} />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value={translations.type} />

                    <select onChange={handleOnChange} value={data.role} className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" id="role" name="role">
                        <option value="3">{translations.seeker}</option>
                        <option value="4">{translations.company}</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">

                    {
                        locale == 'en' ?
                            <Link href={route('language.set', ['ar'])} className='me-auto w-6 rounded hover:shadow-md hover:shadow-gray-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-sy" viewBox="0 0 640 480">
                                    <rect width="640" height="160" y="160" fill="#fff" fillRule="evenodd" rx="0" ry="0" />
                                    <rect width="640" height="160" y="320" fillRule="evenodd" rx="0" ry="0" />
                                    <path fill="red" fillRule="evenodd" d="M0 0h640v160H0z" />
                                    <path fill="#090" fillRule="evenodd" d="M201.9 281l-28.8-20.9-28.7 21.1 10.7-34.2-28.7-21.2 35.4-.3 11-34.1 11.3 34h35.4L191 246.9l10.9 34.2zm307.6 0l-28.8-20.9-28.7 21.1 10.7-34.2-28.6-21.2 35.4-.3 11-34.1 11.2 34h35.4l-28.5 21.4 11 34.2z" />
                                </svg>
                            </Link>
                            :
                            <Link href={route('language.set', ['en'])} className='me-auto w-6 rounded hover:shadow-md hover:shadow-gray-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-gb" viewBox="0 0 640 480">
                                    <defs>
                                        <clipPath id="a">
                                            <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#a)" transform="translate(80) scale(.94)">
                                        <g strokeWidth="1pt">
                                            <path fill="#012169" d="M-256 0H768v512H-256z" />
                                            <path fill="#fff" d="M-256 0v57.2L653.5 512H768v-57.2L-141.5 0H-256zM768 0v57.2L-141.5 512H-256v-57.2L653.5 0H768z" />
                                            <path fill="#fff" d="M170.7 0v512h170.6V0H170.7zM-256 170.7v170.6H768V170.7H-256z" />
                                            <path fill="#c8102e" d="M-256 204.8v102.4H768V204.8H-256zM204.8 0v512h102.4V0H204.8zM-256 512L85.3 341.3h76.4L-179.7 512H-256zm0-512L85.3 170.7H9L-256 38.2V0zm606.4 170.7L691.7 0H768L426.7 170.7h-76.3zM768 512L426.7 341.3H503l265 132.5V512z" />
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                    }

                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {translations.already}
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {translations.register}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
