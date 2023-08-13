import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Locale, Role } from "@/enums/app_enums";
import { User } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import AdminDashboardLayout from "../Partials/AdminDashboardLayout";
import InputError from "@/Components/InputError";

interface adminFormProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    admin?: User;
}

export default function AdminForm({
    locale,
    translations,
    auth,
    activeLink,
    admin,
}: adminFormProps) {
    const editMode = admin != undefined;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<{ editableAdmin: User }>({
            editableAdmin: admin
                ? admin
                : {
                      id: 0,
                      first_name: "",
                      last_name: "",
                      role: Role.Admin,
                      email: "",
                      password: "",
                      email_verified_at: "",
                  },
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) post(route("admin.editAdmin", admin.id));
        else post(route("admin.addAdmin"));
    };

    return (
        <AdminDashboardLayout
            auth={auth}
            locale={locale}
            translations={translations}
            activeLink={activeLink}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 w-full flex justify-center">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg xl:w-[55%] w-4/5">
                    <section className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Scrape Admins
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                {editMode
                                    ? "Edit existing scrape admin."
                                    : "Add new scrape admin."}
                            </p>
                        </header>

                        <div className="mt-5">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="first_name"
                                        value="First Name"
                                    />

                                    <TextInput
                                        id="first_name"
                                        className="mt-1 block w-full"
                                        value={data.editableAdmin.first_name}
                                        onChange={(e) =>
                                            setData("editableAdmin", {
                                                ...data.editableAdmin,
                                                first_name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="last_name"
                                        value="Last Name"
                                    />

                                    <TextInput
                                        id="last_name"
                                        className="mt-1 block w-full"
                                        value={data.editableAdmin.last_name}
                                        onChange={(e) =>
                                            setData("editableAdmin", {
                                                ...data.editableAdmin,
                                                last_name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        className="mt-1 block w-full"
                                        value={data.editableAdmin.email}
                                        type="email"
                                        onChange={(e) =>
                                            setData("editableAdmin", {
                                                ...data.editableAdmin,
                                                email: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                {!editMode && (
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />

                                        <TextInput
                                            id="password"
                                            className="mt-1 block w-full"
                                            value={data.editableAdmin.password}
                                            type="password"
                                            onChange={(e) =>
                                                setData("editableAdmin", {
                                                    ...data.editableAdmin,
                                                    password: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                )}

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
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
