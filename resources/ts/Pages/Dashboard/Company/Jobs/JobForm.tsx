import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Job, JobCategory, JobType } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { countries } from "countries-list";
import Select from "react-select";
import RangeSlider from "./Partials/RangeSlider";

const JobForm: React.FC<{
    job?: Job | undefined;
    edit: boolean;
    routeName: string;
    categories: JobCategory[];
    types: JobType[];
}> = ({ job, edit, routeName, categories, types }) => {
    const {
        data,
        setData,
        patch,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm<{
        title: string;
        location: string;
        description: string;
        requirements: string;
        benefits: string;
        experience: number;
        min_salary: number;
        max_salary: number;
        min_age: number;
        max_age: number;
        gender: string | number | boolean | null;
        expiration_date: string;
        job_category_id: number;
        job_types: number[];
    }>({
        title: (job && job.title) ?? "",
        location: (job && job.location) ?? "",
        description: (job && job.description) ?? "",
        requirements: (job && job.requirements) ?? "",
        benefits: (job && job.benefits) ?? "",
        experience: (job && job.experience) ?? 0,
        min_salary: (job && job.min_salary) ?? 100000,
        max_salary: (job && job.max_salary) ?? 10000000,
        min_age: (job && job.min_age) ?? 15,
        max_age: (job && job.max_age) ?? 100,
        gender: (job && job.gender) ?? null,
        expiration_date: (job && job.expiration_date) ?? "",
        job_category_id: (job && job.job_category_id) ?? categories[0]!.id,
        job_types: (job && job.job_types?.map((t) => t.id)) ?? [],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (edit) patch(route(routeName, job!.id!));
        else post(route(routeName));
    };

    var minDay = new Date();
    var minDayStr = new Date(minDay.setDate(minDay.getDate() + 1))
        .toISOString()
        .split("T")[0];

    const genderOptions = [
        {
            value: null,
            label: "No Preference",
        },
        {
            value: false,
            label: "Male",
        },
        {
            value: true,
            label: "Female",
        },
    ];

    console.log(job);

    return (
        <form className="p-6" id="job-form" onSubmit={handleSubmit}>
            <div className="form-group flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="Title" value="Job Title" />

                    <TextInput
                        id="Title"
                        type="text"
                        name="Title"
                        onChange={(e) => setData("title", e.target.value)}
                        value={data.title ? data.title : ""}
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>
                <div className="w-full">
                    <InputLabel htmlFor="experience" value="Experience Years" />

                    <TextInput
                        id="experience"
                        type="number"
                        min="0"
                        max="15"
                        name="experience"
                        onChange={(e) => {
                            if (
                                e.target.valueAsNumber < 0 ||
                                e.target.valueAsNumber > 15
                            ) {
                                e.preventDefault();
                                return;
                            }
                            setData("experience", e.target.valueAsNumber);
                        }}
                        value={data.experience ? data.experience : 0}
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.experience} className="mt-2" />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="location" value="Location" />

                    <Select
                        id="location"
                        name="location"
                        className="react-select w-full rounded-md shadow-sm mt-1"
                        options={Object.keys(countries).map((key: any) => ({
                            value: key,
                            label: (countries as any)[key].name,
                        }))}
                        value={
                            !data.location
                                ? null
                                : {
                                      value: data.location,
                                      label: (countries as any)[data.location!]
                                          .name,
                                  }
                        }
                        onChange={(e) => setData("location", e!.value)}
                    />

                    <InputError message={errors.location} className="mt-2" />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="gender" value="Gender" />

                    <Select
                        id="gender"
                        name="gender"
                        className="react-select w-full rounded-md shadow-sm mt-1"
                        options={genderOptions}
                        value={
                            genderOptions.filter(
                                (o) => o.value === data.gender
                            )[0]
                        }
                        onChange={(e) => setData("gender", e!.value)}
                    />

                    <InputError message={errors.gender} className="mt-2" />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel
                        htmlFor="job_category_id"
                        value="Job Category"
                    />

                    <Select
                        id="job_category_id"
                        name="job_category_id"
                        className="react-select w-full rounded-md shadow-sm mt-1"
                        options={categories.map((c) => ({
                            value: c.id,
                            label: c.name_en,
                        }))}
                        onChange={(e) => setData("job_category_id", e!.value)}
                        value={
                            !data.job_category_id
                                ? null
                                : {
                                      value: data.job_category_id,
                                      label: categories.filter(
                                          (c) => c.id == data.job_category_id
                                      )[0].name_en,
                                  }
                        }
                    />

                    <InputError
                        message={errors.job_category_id}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="job_types" value="Job Type" />

                    <Select
                        id="job_types"
                        name="job_types"
                        className="react-select w-full rounded-md shadow-sm mt-1"
                        isMulti
                        isClearable
                        options={types.map((c) => ({
                            value: c.id,
                            label: c.name_en,
                        }))}
                        onChange={(e) =>
                            setData(
                                "job_types",
                                [...e].map((obj) => obj.value)
                            )
                        }
                        value={data.job_types.map((id) => ({
                            value: id,
                            label: types.filter((type) => type.id == id)[0]
                                .name_en,
                        }))}
                        required
                    />

                    <InputError message={errors.job_types} className="mt-2" />
                </div>
            </div>

            <div className="form-group w-full mt-6">
                <InputLabel htmlFor="expiration_date" value="Expiration Date" />

                <TextInput
                    id="expiration_date"
                    type="date"
                    name="expiration_date"
                    onChange={(e) =>
                        setData({
                            ...data,
                            expiration_date: e.target.value,
                        })
                    }
                    value={data.expiration_date ? data.expiration_date : ""}
                    className="mt-1 block w-full"
                    min={minDayStr}
                    required
                />
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="salary" value="Salary Range" />
                    <RangeSlider
                        value={[data.min_salary, data.max_salary]}
                        min={100000}
                        max={10000000}
                        step={50000}
                        onChange={(e) => {
                            setData({
                                ...data,
                                min_salary: e[0],
                                max_salary: e[1],
                            });
                        }}
                    />
                    <InputError message={errors.min_salary} className="mt-2" />
                    <InputError message={errors.max_salary} className="mt-2" />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="age" value="Age Range" />
                    <RangeSlider
                        value={[data.min_age, data.max_age]}
                        min={15}
                        max={100}
                        step={1}
                        onChange={(e) => {
                            setData({
                                ...data,
                                min_age: e[0],
                                max_age: e[1],
                            });
                        }}
                    />
                    <InputError message={errors.min_age} className="mt-2" />
                    <InputError message={errors.max_age} className="mt-2" />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="requirements" value="Requirements" />

                    <textarea
                        id="requirements"
                        className="mt-1 block w-full rounded-md min-h-[8rem] shadow-sm border-gray-300"
                        onChange={(e) =>
                            setData({
                                ...data,
                                requirements: e.target.value,
                            })
                        }
                        value={data.requirements ? data.requirements : ""}
                    />
                </div>
            </div>

            <div className="form-group mt-6 flex flex-row gap-3">
                <div className="w-full">
                    <InputLabel htmlFor="description" value="Description" />

                    <textarea
                        id="description"
                        className="mt-1 block w-full rounded-md min-h-[8rem] shadow-sm border-gray-300"
                        onChange={(e) =>
                            setData({
                                ...data,
                                description: e.target.value,
                            })
                        }
                        value={data.description ? data.description : ""}
                    />
                </div>
            </div>

            <div className="form-group mt-6">
                <div className="w-full">
                    <InputLabel htmlFor="benefits" value="Benefits" />

                    <textarea
                        id="benefits"
                        className="mt-1 block w-full rounded-md min-h-[8rem] shadow-sm border-gray-300"
                        onChange={(e) =>
                            setData({
                                ...data,
                                benefits: e.target.value,
                            })
                        }
                        value={data.benefits ? data.benefits : ""}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
    );
};

export default JobForm;
