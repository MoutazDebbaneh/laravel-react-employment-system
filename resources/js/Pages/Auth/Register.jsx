import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PageLocalizer from '@/Components/PageLocalizer';
import ArabicFlag from '@/Components/ArabicFlag';
import EnglishFlag from '@/Components/EnglishFlag';

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
                                <ArabicFlag />
                            </Link>
                            :
                            <Link href={route('language.set', ['en'])} className='me-auto w-6 rounded hover:shadow-md hover:shadow-gray-700'>
                                <EnglishFlag />
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
