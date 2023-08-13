import { FormEventHandler, useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Locale } from "@/enums/app_enums";
import DefaultLayout from "@/Layouts/DefaultLayout";
import StyledInputLabel from "@/Components/StyledInputLabel";
import StyledTextInput from "@/Components/StyledTextInput";
import Container from "@/Utils/Container";

import bgLogin from "/resources/images/bg-login.svg";
import Checkbox from "@/Components/Checkbox";
import PageLocalizer from "@/Components/PageLocalizer";

export default function NewLogin({
    status,
    locale,
    translations,
    auth,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    console.log(translations);

    return (
        <DefaultLayout
            translations={translations.navbar as Translations}
            locale={locale}
            auth={auth}
        >
            <PageLocalizer locale={locale} />
            <Head title={translations.title.toString()} />

            <Container>
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <div className="text-center mt-32">
                    <p className="text-primary-blue font-medium leading-[22px] text-[17px]">
                        {translations.welcome.toString()}
                    </p>
                    <h2 className="text-dark-blue font-extrabold text-[3rem] leading-[45px] mt-3">
                        {translations.heading.toString()}
                    </h2>
                    <p className="text-muted mt-3">
                        {translations.subheading.toString()}
                    </p>
                </div>
                <div className="px-8 lg:px-16 xl:px-[22rem] mt-5 overflow-hidden">
                    <div className="divider h-[1px] w-full bg-[#E0E6F6] mb-6"></div>

                    <div className="bg-img relative hidden xl:block">
                        {locale == Locale.English ? (
                            <div className="shape-1 absolute top-14 left-[34rem] w-full">
                                <img
                                    className="img"
                                    alt="jobBox"
                                    src={bgLogin}
                                />
                            </div>
                        ) : (
                            <div className="shape-1 absolute top-14 right-[34rem] w-full">
                                <img
                                    className="img"
                                    alt="jobBox"
                                    src={bgLogin}
                                />
                            </div>
                        )}
                    </div>
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <StyledInputLabel
                                htmlFor="email"
                                value={`${translations.email.toString()} *`}
                            />
                            <StyledTextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4">
                            <StyledInputLabel
                                htmlFor="password"
                                value={`${translations.password.toString()} *`}
                            />
                            <StyledTextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4 flex justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    value={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.value)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    {translations.remember.toString()}
                                </span>
                            </label>
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none"
                            >
                                {translations.forgot.toString()}
                            </Link>
                        </div>

                        <div className="form-group mt-4">
                            <button
                                type="submit"
                                className="w-full block bg-dark-blue border border-solid border-[#E0E6F7] rounded-[4px] py-4 mt-2 text-white text-[15px] hover:bg-primary-blue hover:-translate-y-0.5 transition-all"
                                disabled={processing}
                            >
                                {translations.login.toString()}
                            </button>
                        </div>

                        <div className="form-group mt-4 mb-10 text-center">
                            <span className="text-muted d-inline">
                                {translations.new_account1.toString()}
                            </span>
                            <Link className="d-inline" href={route("register")}>
                                {translations.new_account2.toString()}
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </DefaultLayout>
    );
}
