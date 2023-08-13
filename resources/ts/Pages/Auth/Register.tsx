import { Link, Head, useForm } from "@inertiajs/react";
import { Locale } from "@/enums/app_enums";
import DefaultLayout from "@/Layouts/DefaultLayout";
import Container from "@/Utils/Container";
import { useEffect, FormEventHandler } from "react";
import StyledInputLabel from "@/Components/StyledInputLabel";
import StyledTextInput from "@/Components/StyledTextInput";
import InputError from "@/Components/InputError";
import "../../../css/animation.css";

import bgRegister from "/resources/images/bg-register.svg";
import Checkbox from "@/Components/Checkbox";
import PageLocalizer from "@/Components/PageLocalizer";

export default function NewRegister({
    locale,
    translations,
    auth,
}: {
    locale: Locale;
    translations: Translations;
    auth: any;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: 3,
        agree: false,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation", "agree");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    console.log(translations);

    return (
        <DefaultLayout
            locale={locale}
            translations={translations.navbar as Translations}
            auth={auth}
        >
            <PageLocalizer locale={locale} />
            <Head title={translations.title.toString()} />

            <Container>
                <div className="text-center mt-32">
                    <p className="text-primary-blue font-medium leading-[22px] text-[17px]">
                        {translations.title.toString()}{" "}
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
                        <div className="shape-1 absolute top-14 left-[34rem] w-full">
                            <img
                                className="img"
                                alt="jobBox"
                                src={bgRegister}
                            />
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <StyledInputLabel
                                htmlFor="first_name"
                                value={`${translations.first.toString()} *`}
                            />
                            <StyledTextInput
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                autoComplete="first_name"
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.first_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4">
                            <StyledInputLabel
                                htmlFor="last_name"
                                value={`${translations.last.toString()} *`}
                            />
                            <StyledTextInput
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                className="mt-1 block w-full"
                                autoComplete="last_name"
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.last_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4">
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
                                htmlFor="passowrd"
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

                        <div className="form-group mt-4">
                            <StyledInputLabel
                                htmlFor="password_confirmation"
                                value={`${translations.confirm.toString()} *`}
                            />
                            <StyledTextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4">
                            <StyledInputLabel
                                htmlFor="role"
                                value={`${translations.type.toString()} *`}
                            />
                            <select
                                onChange={(e) =>
                                    setData("role", parseInt(e.target.value))
                                }
                                value={data.role}
                                className="w-full block border border-solid border-[#E0E6F7] rounded-[4px] h-[50px] pl-5 mt-2 text-[#A0ABB8] focus:text-black focus:shadow-none focus:ring-0 focus:border-[#B4C0E0] text-[15px]"
                                id="role"
                                name="role"
                            >
                                <option value="3">
                                    {translations.seeker.toString()}
                                </option>
                                <option value="4">
                                    {translations.company.toString()}
                                </option>
                            </select>
                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.agree}
                                    onChange={(e) =>
                                        setData("agree", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-dark-blue text-[15px]">
                                    {translations.agree1.toString()}
                                    <span>
                                        <a href="">
                                            {translations.agree2.toString()}
                                        </a>
                                    </span>
                                </span>
                            </label>
                            <InputError
                                message={errors.agree}
                                className="mt-2"
                            />
                        </div>

                        <div className="form-group mt-4">
                            <button
                                className="w-full block bg-dark-blue border border-solid border-[#E0E6F7] rounded-[4px] py-4 mt-2 text-white text-[15px] hover:bg-primary-blue hover:-translate-y-0.5 transition-all"
                                disabled={processing}
                            >
                                {translations.register.toString()}
                            </button>
                        </div>

                        <div className="form-group mt-4 mb-10 text-center">
                            <span className="text-muted d-inline">
                                {translations.already.toString()}
                            </span>
                            <Link className="d-inline" href={route("login")}>
                                {translations.login.toString()}
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </DefaultLayout>
    );
}
