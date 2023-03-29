import { FormEventHandler, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PageLocalizer from '@/Components/PageLocalizer';
import ArabicFlag from '@/Components/ArabicFlag';
import EnglishFlag from '@/Components/EnglishFlag';
import { Locale } from '@/enums/app_enums';

export default function Register({ locale, translations }: { locale: Locale, translations: Translations }) {
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <PageLocalizer locale={locale} />
            <Head title={translations.title.toString()} />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="first_name" value={translations.first.toString()} />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        isFocused={true}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value={translations.last.toString()} />

                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value={translations.email.toString()} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={translations.password.toString()} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value={translations.confirm.toString()} />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value={translations.type.toString()} />

                    <select onChange={(e) => setData('role', parseInt(e.target.value))} value={data.role} className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" id="role" name="role">
                        <option value="3">{translations.seeker.toString()}</option>
                        <option value="4">{translations.company.toString()}</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">

                    {
                        locale == Locale.English ?
                            <Link href={route('language.set', [Locale.Arabic])} className='me-auto w-6 rounded hover:shadow-md hover:shadow-gray-700'>
                                <ArabicFlag />
                            </Link>
                            :
                            <Link href={route('language.set', [Locale.English])} className='me-auto w-6 rounded hover:shadow-md hover:shadow-gray-700'>
                                <EnglishFlag />
                            </Link>
                    }

                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {translations.already.toString()}
                    </Link>

                    <PrimaryButton className={'ms-4' + (locale == Locale.Arabic ? ' !tracking-normal' : '')} disabled={processing}>
                        {translations.register.toString()}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
