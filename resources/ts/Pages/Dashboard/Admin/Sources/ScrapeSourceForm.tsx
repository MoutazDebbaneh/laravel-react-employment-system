import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Locale } from "@/enums/app_enums";
import { ScrapeSource } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import AdminDashboardLayout from "../Partials/AdminDashboardLayout";

interface scrapeSourcesProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    source?: ScrapeSource;
}

export default function ScrapeSourceForm({
    locale,
    translations,
    auth,
    activeLink,
    source,
}: scrapeSourcesProps) {
    const editMode = source != undefined;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<{ editableSource: ScrapeSource }>({
            editableSource: source
                ? source
                : {
                      id: 0,
                      name: "",
                      logo: null,
                      scrape_source_configuration: {
                          id: 0,
                          scrape_source_id: 0,
                          jobs_list_url: "",
                          pagination_variable: "",
                          jobs_link_selector: "",
                          title_selector: "",
                          company_selector: null,
                          location_selector: null,
                          description_selector: null,
                          requirements_selector: null,
                          benefits_selector: null,
                          experience_selector: null,
                          min_salary_selector: null,
                          max_salary_selector: null,
                          min_age_selector: null,
                          max_age_selector: null,
                          gender_selector: null,
                          display_image_selector: null,
                          post_date_selector: null,
                          expiration_date_selector: null,
                          type_selector: null,
                          category_selector: null,
                          created_at: "string",
                          updated_at: "string",
                      },
                  },
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) post(route("admin.scrapeSources.editSource", source.id));
        else post(route("admin.scrapeSources.addSource"));
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
                                Scrape Sources
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                {editMode
                                    ? "Edit existing scrape source."
                                    : "Add new scrape source."}
                            </p>
                        </header>

                        <div className="mt-5">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="source_name"
                                        value="Name"
                                    />

                                    <TextInput
                                        id="source_name"
                                        className="mt-1 block w-full"
                                        value={data.editableSource.name}
                                        onChange={(e) =>
                                            setData("editableSource", {
                                                ...data.editableSource,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="logo" value="Logo" />

                                    <input
                                        className="mt-1 relative block shadow-sm w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData("editableSource", {
                                                ...data.editableSource,
                                                logo: e.target!.files![0],
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="jobs_list_url"
                                            value="Jobs List Url"
                                        />

                                        <TextInput
                                            id="jobs_list_url"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .jobs_list_url
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            jobs_list_url:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="pagination_variable"
                                            value="Pagination Variable"
                                        />

                                        <TextInput
                                            id="pagination_variable"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .pagination_variable
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            pagination_variable:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="jobs_link_selector"
                                            value="Jobs Link Selector"
                                        />

                                        <TextInput
                                            id="jobs_link_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .jobs_link_selector
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            jobs_link_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="title_selector"
                                            value="Title Selector"
                                        />

                                        <TextInput
                                            id="title_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .title_selector
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            title_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="company_selector"
                                            value="Company Selector"
                                        />

                                        <TextInput
                                            id="company_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .company_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            company_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="location_selector"
                                            value="Location Selector"
                                        />

                                        <TextInput
                                            id="location_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .location_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            location_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="description_selector"
                                            value="Description Selector"
                                        />

                                        <TextInput
                                            id="description_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .description_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            description_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="requirements_selector"
                                            value="Requirements Selector"
                                        />

                                        <TextInput
                                            id="requirements_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .requirements_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            requirements_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="benefits_selector"
                                            value="Benefits Selector"
                                        />

                                        <TextInput
                                            id="benefits_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .benefits_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            benefits_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="experience_selector"
                                            value="Experience Selector"
                                        />

                                        <TextInput
                                            id="experience_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .experience_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            experience_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="min_salary_selector"
                                            value="Minimum Salary Selector"
                                        />

                                        <TextInput
                                            id="min_salary_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .min_salary_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            min_salary_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="max_salary_selector"
                                            value="Maximum Salary Selector"
                                        />

                                        <TextInput
                                            id="max_salary_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .max_salary_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            max_salary_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="min_age_selector"
                                            value="Minimum Age Selector"
                                        />

                                        <TextInput
                                            id="min_age_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .min_age_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            min_age_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="max_age_selector"
                                            value="Maximum Age Selector"
                                        />

                                        <TextInput
                                            id="max_age_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .max_age_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            max_age_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="post_date_selector"
                                            value="Post Date Selector"
                                        />

                                        <TextInput
                                            id="post_date_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .post_date_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            post_date_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="expiration_date_selector"
                                            value="Expiration Date Selector"
                                        />

                                        <TextInput
                                            id="expiration_date_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .expiration_date_selector ??
                                                ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            expiration_date_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group flex flex-row w-full gap-3">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="type_selector"
                                            value="Type Selector"
                                        />

                                        <TextInput
                                            id="type_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .type_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            type_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="category_selector"
                                            value="Category Selector"
                                        />

                                        <TextInput
                                            id="category_selector"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .scrape_source_configuration!
                                                    .category_selector ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    scrape_source_configuration:
                                                        {
                                                            ...data
                                                                .editableSource
                                                                .scrape_source_configuration!,
                                                            category_selector:
                                                                e.target.value,
                                                        },
                                                })
                                            }
                                        />
                                    </div>
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
