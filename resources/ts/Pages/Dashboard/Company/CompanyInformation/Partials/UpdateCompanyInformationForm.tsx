import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Company } from "@/types";
import {
    faCheckCircle,
    faInfoCircle,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import { countries } from "countries-list";
import { FormEventHandler } from "react";
import Select from "react-select";

export default function UpdateCompanyInformationForm({
    status,
    verificationError,
    className,
    company,
}: {
    status?: string;
    verificationError?: string;
    className?: string;
    company: Company;
}) {
    if (company.logo !== null) company.logo = null;
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<{
            name: string | null | undefined;
            email: string | null | undefined;
            logo: File | null | undefined;
            website: string | null | undefined;
            phone: string | null | undefined;
            headquarters: string | null | undefined;
        }>({
            name: company.name,
            email: company.email,
            logo: company.logo,
            website: company.website,
            headquarters: company.headquarters,
            phone: company.phone,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("company.info.update"));
    };

    console.log(status);

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Company Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your company's information.
                    </p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Company Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name ?? ""}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="given-name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Company Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email ?? ""}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />

                        <TextInput
                            id="phone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone ?? ""}
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.phone} />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="headquarters"
                            value="Headquarters"
                        />

                        <Select
                            id="headquarters"
                            name="headquarters"
                            className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                            options={Object.keys(countries).map((key: any) => ({
                                value: key,
                                label: (countries as any)[key].name,
                            }))}
                            value={
                                !data.headquarters
                                    ? null
                                    : {
                                          value: data.headquarters,
                                          label: (countries as any)[
                                              data.headquarters!
                                          ].name,
                                      }
                            }
                            onChange={(e) => setData("headquarters", e!.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.headquarters}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="website" value="Website" />

                        <TextInput
                            id="website"
                            className="mt-1 block w-full"
                            value={data.website ?? ""}
                            onChange={(e) => setData("website", e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.website} />
                    </div>

                    <div>
                        <InputLabel htmlFor="logo" value="Company Logo" />

                        <input
                            className="mt-1 relative block shadow-sm w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            onChange={(e) =>
                                setData("logo", e.target!.files![0])
                            }
                        />

                        <InputError className="mt-2" message={errors.logo} />
                    </div>

                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            {!status && (
                                <>
                                    <FontAwesomeIcon
                                        icon={faWarning}
                                        className="text-red-700 text-base me-1"
                                    />
                                    {"Your company is unverified. "}
                                    <Link
                                        href={route("company.verify")}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Click here to send a verification
                                        request.
                                    </Link>
                                </>
                            )}
                            {status === "verification-request-sent" && (
                                <>
                                    <FontAwesomeIcon
                                        icon={faInfoCircle}
                                        className="text-[#ffc107] text-base me-1"
                                    />
                                    <span>
                                        A verification request has been sent and
                                        is pending admin approval.
                                    </span>
                                </>
                            )}
                            {status === "verified" && (
                                <>
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-[#28a745] text-base me-1"
                                    />
                                    <span>Your company is verified</span>
                                </>
                            )}
                        </p>

                        {verificationError && (
                            <InputError
                                className="mt-2"
                                message={verificationError}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </section>
        </div>
    );
}
