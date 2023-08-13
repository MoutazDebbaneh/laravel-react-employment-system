import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Locale } from "@/enums/app_enums";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { countries } from "countries-list";
import { FormEventHandler, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

export default function PersonalInformation({
    status,
    locale,
    translations,
    langs,
    profile,
    profile_skills,
    profile_languages,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    langs: any;
    profile: any;
    profile_skills: any;
    profile_languages: any;
}) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm<{
            country: string | undefined;
            city: string | undefined;
            address: string | undefined;
            education_level: string | undefined;
            current_position: string | undefined;
            languages: string[] | undefined;
            gender: boolean | undefined | null;
            website: string | undefined;
            profile_picture: any;
            cv_file: any;
            skills: string[] | undefined;
            parse_cv: boolean;
        }>({
            country: profile.country,
            city: profile.city,
            address: profile.address,
            education_level: profile.education_level,
            current_position: profile.current_position,
            languages: profile_languages,
            gender: profile.gender,
            website: profile.website,
            profile_picture: null,
            cv_file: null,
            skills: profile_skills,
            parse_cv: false,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("user.updatePersonalInformation"));
    };

    const educationLevels = ["Highschool", "Bachelor", "Master", "PhD"];

    const skills = [
        "Communication",
        "Interpersonal Skills",
        "Leadership",
        "Teamwork",
        "Time Management",
        "Problem Solving",
        "Adaptability",
        "Creativity",
        "Attention to Detail",
        "Organization",
        "Critical Thinking",
        "Project Management",
        "Customer Service",
        "Sales",
        "Marketing",
        "Writing",
        "Public Speaking",
        "Research",
        "Data Analysis",
        "Programming",
        "Software Development",
        "Web Development",
        "Mobile Development",
        "Object-Oriented Programming",
        "Functional Programming",
        "Database Management",
        "Cloud Computing",
        "DevOps",
        "Agile Methodologies",
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Network Administration",
        "Cybersecurity",
        "Artificial Intelligence/Machine Learning",
        "Data Science",
        "Big Data Analytics",
        "Business Intelligence",
        "Data Warehousing",
        "Data Visualization",
        "Quality Assurance/Testing",
    ];

    const animatedComponents = makeAnimated();

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Personal Information
                    </h2>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="form-group flex flex-row gap-5">
                        <div className="w-full">
                            <InputLabel htmlFor="country" value="Country" />

                            <Select
                                id="country"
                                name="country"
                                className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                                options={Object.keys(countries).map(
                                    (key: any) => ({
                                        value: key,
                                        label: (countries as any)[key].name,
                                    })
                                )}
                                value={
                                    !data.country
                                        ? null
                                        : {
                                              value: data.country,
                                              label: (countries as any)[
                                                  data.country!
                                              ].name,
                                          }
                                }
                                onChange={(e) => setData("country", e!.value)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.country}
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel htmlFor="city" value="City" />

                            <TextInput
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city ?? ""}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.city}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <InputLabel htmlFor="address" value="Address" />

                        <TextInput
                            id="address"
                            className="mt-1 block w-full"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.address} />
                    </div>

                    <div className="form-group flex flex-row gap-5">
                        <div className="w-full">
                            <InputLabel
                                htmlFor="education_level"
                                value="Education Level"
                            />

                            <Select
                                id="education_level"
                                name="education_level"
                                className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                                options={educationLevels.map(
                                    (level: string) => ({
                                        value: level,
                                        label: level,
                                    })
                                )}
                                value={
                                    !data.education_level
                                        ? null
                                        : {
                                              value: data.education_level,
                                              label: data.education_level,
                                          }
                                }
                                onChange={(e) =>
                                    setData("education_level", e!.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.education_level}
                            />
                        </div>

                        <div className="form-group w-full">
                            <InputLabel
                                htmlFor="current_position"
                                value="Current Position"
                            />

                            <TextInput
                                id="current_position"
                                className="mt-1 block w-full"
                                value={data.current_position ?? ""}
                                onChange={(e) =>
                                    setData("current_position", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.current_position}
                            />
                        </div>
                    </div>

                    <div className="form-group flex flex-row gap-5">
                        <div className="w-full">
                            <InputLabel htmlFor="gender" value="Gender" />
                            <Select
                                id="gender"
                                name="gender"
                                className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                                options={[
                                    { value: "0", label: "Male" },
                                    { value: "1", label: "Female" },
                                ]}
                                value={
                                    data.gender == null
                                        ? null
                                        : {
                                              label: data.gender!
                                                  ? "Female"
                                                  : "Male",
                                              value: data.gender! ? "1" : "0",
                                          }
                                }
                                onChange={(e) =>
                                    setData("gender", e!.value == "1")
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.gender}
                            />
                        </div>

                        <div className="w-full">
                            <InputLabel htmlFor="website" value="Website" />

                            <TextInput
                                id="website"
                                className="mt-1 block w-full"
                                type="url"
                                value={data.website ?? ""}
                                onChange={(e) =>
                                    setData("website", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.website}
                            />
                        </div>
                    </div>

                    <div className="form-group w-full">
                        <InputLabel htmlFor="skills" value="Skills" />

                        <CreatableSelect
                            id="skills"
                            name="skills"
                            components={animatedComponents}
                            className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                            options={skills.map((skill: string) => ({
                                value: skill,
                                label: skill,
                            }))}
                            onChange={(e: any) =>
                                setData(
                                    "skills",
                                    [...e].map((obj: any) => obj.value)
                                )
                            }
                            value={data.skills!.map((skill: string) => ({
                                value: skill,
                                label: skill,
                            }))}
                            isClearable
                            isMulti
                        />

                        <InputError className="mt-2" message={errors.skills} />
                    </div>

                    <div className="form-group w-full">
                        <InputLabel htmlFor="languages" value="Languages" />
                        <Select
                            id="languages"
                            name="languages"
                            components={animatedComponents}
                            className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                            options={langs.map((lang: any) => ({
                                value: lang.id,
                                label:
                                    locale == Locale.English
                                        ? lang.name_en
                                        : lang.name_ar,
                            }))}
                            onChange={(e: any) =>
                                setData(
                                    "languages",
                                    [...e].map((obj: any) => obj.value)
                                )
                            }
                            value={data.languages!.map((lang: string) => {
                                const langObj = langs.find(
                                    (l: any) => l.id == lang
                                );
                                return {
                                    value: langObj.id,
                                    label:
                                        locale == Locale.English
                                            ? langObj.name_en
                                            : langObj.name_ar,
                                };
                            })}
                            isMulti
                        />

                        <InputError
                            className="mt-2"
                            message={errors.languages}
                        />
                    </div>

                    <div className="w-full">
                        <InputLabel
                            htmlFor="profile_picture"
                            value="Profile Picture"
                        />

                        <input
                            className="mt-1 relative block shadow-sm w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                            type="file"
                            id="profile-picture"
                            name="profile-picture"
                            accept="image/*"
                            onChange={(e) =>
                                setData("profile_picture", e.target!.files![0])
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.profile_picture}
                        />
                    </div>

                    <div className="w-full">
                        <InputLabel
                            htmlFor="cv_file"
                            value="Curriculum Vitae (CV) File"
                        />

                        <input
                            className="mt-1 relative block shadow-sm w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.12rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                            type="file"
                            id="cv-file"
                            name="cv-file"
                            accept="application/msword, application/pdf, .docx"
                            onChange={(e) =>
                                setData("cv_file", e.target!.files![0])
                            }
                        />

                        <InputError className="mt-2" message={errors.cv_file} />
                    </div>

                    {data.cv_file != null && (
                        <div className="parse flex items-center gap-2">
                            <Checkbox
                                checked={data.parse_cv}
                                onChange={(e) =>
                                    setData("parse_cv", e.target.checked)
                                }
                                value="hi"
                            />
                            <span>Parse CV Info</span>
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
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </section>
        </div>
    );
}
