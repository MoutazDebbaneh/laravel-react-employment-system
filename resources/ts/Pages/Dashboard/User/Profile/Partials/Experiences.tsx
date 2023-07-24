import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {
    faEdit,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";

type Experience = {
    company: string;
    position: string;
    description: string;
    from: string;
    to: string;
};

const Experiecnces: React.FC<{ initialData: Experience[] }> = ({
    initialData,
}) => {
    const [showEditableExperienceModal, setShowEditableExperienceModal] =
        useState(false);
    // const [experiences, setExperiences] = useState(initialData);
    const [editMode, setEditMode] = useState<boolean | number>(false);

    const [editableExperience, setEditableExperience] = useState<Experience>({
        company: "",
        position: "",
        description: "",
        from: "",
        to: "",
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (editMode === false) {
            setData("experiences", [...data.experiences, editableExperience]);
        } else {
            const index = editMode as number;
            setData("experiences", [
                ...data.experiences.slice(0, index),
                editableExperience,
                ...data.experiences.slice(index + 1),
            ]);
        }
        setEditableExperience({
            company: "",
            position: "",
            description: "",
            from: "",
            to: "",
        });
        setShowEditableExperienceModal(false);
        // setData("experiences", experiences);
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        const cell = (
            event.target as HTMLElement
        ).closest<HTMLTableCellElement>("td");

        if (cell) {
            const row = cell.closest<HTMLTableRowElement>("tr");
            const rowIndex = row!.rowIndex - 1;
            setData("experiences", [
                ...data.experiences.slice(0, rowIndex),
                ...data.experiences.slice(rowIndex + 1),
            ]);
        }
        // setData("experiences", experiences);
    }

    function handleEdit(event: React.MouseEvent<HTMLButtonElement>) {
        const cell = (
            event.target as HTMLElement
        ).closest<HTMLTableCellElement>("td");

        if (cell) {
            const row = cell.closest<HTMLTableRowElement>("tr");
            const rowIndex = row!.rowIndex - 1;
            setEditMode(rowIndex);
            setEditableExperience(data.experiences[rowIndex]);
            setShowEditableExperienceModal(true);
        }
        setData("experiences", data.experiences);
    }

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<{
            experiences: Experience[];
        }>({
            experiences: initialData,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("user.updateExperiences"));
    };

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Work Experiences
                    </h2>
                </header>

                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-[14px] font-medium text-gray-500 tracking-wider"
                                >
                                    Experience
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className="ms-2 text-dark-blue cursor-pointer"
                                        onClick={() =>
                                            setShowEditableExperienceModal(true)
                                        }
                                    />
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.experiences.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={handleEdit}
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="ml-3 text-red-600 hover:text-red-900"
                                            onClick={handleDelete}
                                        >
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal
                        show={showEditableExperienceModal}
                        onClose={() => {}}
                    >
                        <form
                            className="p-6"
                            id="new-experience-form"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Add new experience
                            </h2>

                            <div className="form-group mt-6 flex flex-row gap-3">
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="start_date"
                                        value="From"
                                    />

                                    <TextInput
                                        id="start_date"
                                        type="date"
                                        name="start_date"
                                        onChange={(e) =>
                                            setEditableExperience({
                                                ...editableExperience,
                                                from: e.target.value,
                                            })
                                        }
                                        value={editableExperience.from}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel htmlFor="end_date" value="To" />

                                    <TextInput
                                        id="end_date"
                                        type="date"
                                        name="end_date"
                                        onChange={(e) =>
                                            setEditableExperience({
                                                ...editableExperience,
                                                to: e.target.value,
                                            })
                                        }
                                        value={editableExperience.to}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group mt-6 flex flex-row gap-3">
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="position"
                                        value="Position"
                                    />

                                    <TextInput
                                        id="position"
                                        type="text"
                                        name="position"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setEditableExperience({
                                                ...editableExperience,
                                                position: e.target.value,
                                            })
                                        }
                                        value={editableExperience.position}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="company"
                                        value="Company"
                                    />

                                    <TextInput
                                        id="company"
                                        type="text"
                                        name="company"
                                        onChange={(e) =>
                                            setEditableExperience({
                                                ...editableExperience,
                                                company: e.target.value,
                                            })
                                        }
                                        value={editableExperience.company}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group w-full mt-6">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    onChange={(e) =>
                                        setEditableExperience({
                                            ...editableExperience,
                                            description: e.target.value,
                                        })
                                    }
                                    value={editableExperience.description}
                                    className="mt-1 block w-full"
                                    required
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton
                                    onClick={() =>
                                        setShowEditableExperienceModal(false)
                                    }
                                >
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton className="ml-3" type="submit">
                                    Confirm
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="flex items-center gap-4 mt-6">
                    <PrimaryButton onClick={submit}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </section>
        </div>
    );
};

export default Experiecnces;
