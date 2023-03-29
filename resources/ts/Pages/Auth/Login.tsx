import { FormEventHandler, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
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

export default function Login({ status, canResetPassword, locale, translations }: { status?: string, canResetPassword: boolean, locale: Locale, translations: Translations }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <PageLocalizer locale={locale} />
            <Head title={translations.title.toString()} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value={translations.email.toString()} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} onChange={(e) => setData('remember', e.target.value)} />
                        <span className="ms-2 text-sm text-gray-600">{translations.remember.toString()}</span>
                    </label>
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

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {translations.forgot.toString()}
                        </Link>
                    )}

                    <PrimaryButton className={'ms-4' + (locale == Locale.Arabic ? ' !tracking-normal' : '')} disabled={processing}>
                        {translations.login.toString()}
                    </PrimaryButton>

                </div>
            </form>
        </GuestLayout >
    );
}
