import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Locale } from "@/enums/app_enums";
import { APISource } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import AdminDashboardLayout from "../Partials/AdminDashboardLayout";
import Select from "react-select";

interface apiSourcesProps {
    locale: Locale;
    translations: Translations;
    auth: Auth;
    activeLink?: string | null;
    source?: APISource;
}

export default function APISourceForm({
    locale,
    translations,
    auth,
    activeLink,
    source,
}: apiSourcesProps) {
    const editMode = source != undefined;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<{ editableSource: APISource }>({
            editableSource: source
                ? source
                : {
                      id: 0,
                      name: "",
                      logo: null,
                      api_source_configuration: {
                          id: 0,
                          api_source_id: 0,
                          jobs_list_endpoint: "",
                          pagination_variable: "",
                          jobs_list_method: "",
                          pagination_pass_type: "",
                          search_variable: "",
                          jobs_array_path: "",
                          job_id_path: "",
                          jobs_link_endpoint: "",
                          jobs_link_method: "",
                          job_id_pass_type: "",
                          title_path: "",
                          company_path: null,
                          location_path: null,
                          description_path: null,
                          requirements_path: null,
                          benefits_path: null,
                          experience_path: null,
                          min_salary_path: null,
                          max_salary_path: null,
                          min_age_path: null,
                          max_age_path: null,
                          gender_path: null,
                          display_image_path: null,
                          post_date_path: null,
                          expiration_date_path: null,
                          type_path: null,
                          category_path: null,
                          gender_map: null,
                          type_map: null,
                          category_map: null,
                          created_at: "string",
                          updated_at: "string",
                      },
                  },
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editMode) post(route("admin.apiSources.editSource", source.id));
        else post(route("admin.apiSources.addSource"));
    };

    const passTypes = [
        { label: "Query", value: "Query" },
        { label: "Path", value: "Path" },
        { label: "Form", value: "Form" },
    ];

    const HTTPMethods = [
        { label: "GET", value: "GET" },
        { label: "POST", value: "POST" },
    ];

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
                                API Sources
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                {editMode
                                    ? "Edit existing API source."
                                    : "Add new API source."}
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
                                            htmlFor="jobs_list_endpoint"
                                            value="Jobs List Endpoint"
                                        />

                                        <TextInput
                                            id="jobs_list_endpoint"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .jobs_list_endpoint
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        jobs_list_endpoint:
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
                                                    .api_source_configuration!
                                                    .pagination_variable
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
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
                                            htmlFor="jobs_list_method"
                                            value="Jobs List Method"
                                        />

                                        <Select
                                            id="jobs_list_method"
                                            className="react-select mt-1 block w-full"
                                            value={
                                                !data.editableSource
                                                    .api_source_configuration
                                                    ?.jobs_list_method
                                                    ? null
                                                    : HTTPMethods.filter(
                                                          (o) =>
                                                              o.value ==
                                                              data
                                                                  .editableSource
                                                                  .api_source_configuration
                                                                  ?.jobs_list_method
                                                      )[0]
                                            }
                                            options={HTTPMethods}
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        jobs_list_method:
                                                            e!.value,
                                                    },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="pagination_pass_type"
                                            value="Pagination Pass Type"
                                        />

                                        <Select
                                            id="pagination_pass_type"
                                            className="react-select mt-1 block w-full"
                                            value={
                                                !data.editableSource
                                                    .api_source_configuration
                                                    ?.pagination_pass_type
                                                    ? null
                                                    : passTypes.filter(
                                                          (o) =>
                                                              o.value ==
                                                              data
                                                                  .editableSource
                                                                  .api_source_configuration
                                                                  ?.pagination_pass_type
                                                      )[0]
                                            }
                                            options={passTypes}
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        pagination_pass_type:
                                                            e!.value,
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
                                            htmlFor="search_variable"
                                            value="Search Variable"
                                        />

                                        <TextInput
                                            id="search_variable"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .search_variable
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        search_variable:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="jobs_array_path"
                                            value="Jobs Array Path"
                                        />

                                        <TextInput
                                            id="jobs_array_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .jobs_array_path
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        jobs_array_path:
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
                                            htmlFor="job_id_path"
                                            value="Job Id Path"
                                        />

                                        <TextInput
                                            id="job_id_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .job_id_path
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        job_id_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="jobs_link_endpoint"
                                            value="Jobs Link Endpoint"
                                        />

                                        <TextInput
                                            id="jobs_link_endpoint"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .jobs_link_endpoint
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        jobs_link_endpoint:
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
                                            htmlFor="jobs_link_method"
                                            value="Jobs Link Method"
                                        />

                                        <Select
                                            id="jobs_link_method"
                                            className="react-select mt-1 block w-full"
                                            value={
                                                !data.editableSource
                                                    .api_source_configuration
                                                    ?.jobs_link_method
                                                    ? null
                                                    : HTTPMethods.filter(
                                                          (o) =>
                                                              o.value ==
                                                              data
                                                                  .editableSource
                                                                  .api_source_configuration
                                                                  ?.jobs_link_method
                                                      )[0]
                                            }
                                            options={HTTPMethods}
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        jobs_link_method:
                                                            e!.value,
                                                    },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="job_id_pass_type"
                                            value="Jobs Id Pass Type"
                                        />

                                        <Select
                                            id="job_id_pass_type"
                                            className="react-select mt-1 block w-full"
                                            value={
                                                !data.editableSource
                                                    .api_source_configuration
                                                    ?.job_id_pass_type
                                                    ? null
                                                    : passTypes.filter(
                                                          (o) =>
                                                              o.value ==
                                                              data
                                                                  .editableSource
                                                                  .api_source_configuration
                                                                  ?.job_id_pass_type
                                                      )[0]
                                            }
                                            options={passTypes}
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        job_id_pass_type:
                                                            e!.value,
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
                                            htmlFor="company_path"
                                            value="Company Path"
                                        />

                                        <TextInput
                                            id="company_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .company_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        company_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="location_path"
                                            value="Location Path"
                                        />

                                        <TextInput
                                            id="location_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .location_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        location_path:
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
                                            htmlFor="description_path"
                                            value="Description Path"
                                        />

                                        <TextInput
                                            id="description_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .description_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        description_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="requirements_path"
                                            value="Requirements Path"
                                        />

                                        <TextInput
                                            id="requirements_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .requirements_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        requirements_path:
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
                                            htmlFor="benefits_path"
                                            value="Benefits Path"
                                        />

                                        <TextInput
                                            id="benefits_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .benefits_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        benefits_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="experience_path"
                                            value="Experience Path"
                                        />

                                        <TextInput
                                            id="experience_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .experience_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        experience_path:
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
                                            htmlFor="min_salary_path"
                                            value="Minimum Salary Path"
                                        />

                                        <TextInput
                                            id="min_salary_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .min_salary_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        min_salary_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="max_salary_path"
                                            value="Maximum Salary Path"
                                        />

                                        <TextInput
                                            id="max_salary_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .max_salary_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        max_salary_path:
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
                                            htmlFor="min_age_path"
                                            value="Minimum Age Path"
                                        />

                                        <TextInput
                                            id="min_age_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .min_age_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        min_age_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="max_age_path"
                                            value="Maximum Age Path"
                                        />

                                        <TextInput
                                            id="max_age_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .max_age_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        max_age_path:
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
                                            htmlFor="post_date_path"
                                            value="Post Date Path"
                                        />

                                        <TextInput
                                            id="post_date_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .post_date_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        post_date_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="expiration_date_path"
                                            value="Expiration Date Path"
                                        />

                                        <TextInput
                                            id="expiration_date_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .expiration_date_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        expiration_date_path:
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
                                            htmlFor="type_path"
                                            value="Type Path"
                                        />

                                        <TextInput
                                            id="type_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .type_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        type_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="category_path"
                                            value="Category Path"
                                        />

                                        <TextInput
                                            id="category_path"
                                            className="mt-1 block w-full"
                                            value={
                                                data.editableSource
                                                    .api_source_configuration!
                                                    .category_path ?? ""
                                            }
                                            onChange={(e) =>
                                                setData("editableSource", {
                                                    ...data.editableSource,
                                                    api_source_configuration: {
                                                        ...data.editableSource
                                                            .api_source_configuration!,
                                                        category_path:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="gender_map"
                                        value="Gender Map"
                                    />

                                    <TextInput
                                        id="gender_map"
                                        className="mt-1 block w-full"
                                        value={
                                            data.editableSource
                                                .api_source_configuration!
                                                .gender_map ?? ""
                                        }
                                        onChange={(e) =>
                                            setData("editableSource", {
                                                ...data.editableSource,
                                                api_source_configuration: {
                                                    ...data.editableSource
                                                        .api_source_configuration!,
                                                    gender_map: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="type_map"
                                        value="Type Map"
                                    />

                                    <TextInput
                                        id="type_map"
                                        className="mt-1 block w-full"
                                        value={
                                            data.editableSource
                                                .api_source_configuration!
                                                .type_map ?? ""
                                        }
                                        onChange={(e) =>
                                            setData("editableSource", {
                                                ...data.editableSource,
                                                api_source_configuration: {
                                                    ...data.editableSource
                                                        .api_source_configuration!,
                                                    type_map: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="category_map"
                                        value="Category Map"
                                    />

                                    <TextInput
                                        id="category_map"
                                        className="mt-1 block w-full"
                                        value={
                                            data.editableSource
                                                .api_source_configuration!
                                                .category_map ?? ""
                                        }
                                        onChange={(e) =>
                                            setData("editableSource", {
                                                ...data.editableSource,
                                                api_source_configuration: {
                                                    ...data.editableSource
                                                        .api_source_configuration!,
                                                    category_map:
                                                        e.target.value,
                                                },
                                            })
                                        }
                                    />
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
