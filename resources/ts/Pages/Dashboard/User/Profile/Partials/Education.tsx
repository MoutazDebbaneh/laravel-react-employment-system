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
import Select from "react-select";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";
import { Education } from "@/types";

const Educations: React.FC<{ initialData: Education[] }> = ({
    initialData,
}) => {
    const [showEditableEducationModal, setShowEditableEducationModal] =
        useState(false);
    const [editMode, setEditMode] = useState<boolean | number>(false);

    const [editableEducation, setEditableEducation] = useState<Education>({
        institute: "",
        degree: "",
        field: "",
        from: "",
        to: "",
    });

    const educationLevels = ["Highschool", "Bachelor", "Master", "PhD"];

    var maxDay = new Date();
    var maxDayStr = new Date(maxDay.setDate(maxDay.getDate() + 1))
        .toISOString()
        .split("T")[0];

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (editMode === false) {
            setData("educations", [...data.educations, editableEducation]);
        } else {
            const index = editMode as number;
            setData("educations", [
                ...data.educations.slice(0, index),
                editableEducation,
                ...data.educations.slice(index + 1),
            ]);
        }
        setEditableEducation({
            institute: "",
            degree: "",
            field: "",
            from: "",
            to: "",
        });
        setShowEditableEducationModal(false);
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        const cell = (
            event.target as HTMLElement
        ).closest<HTMLTableCellElement>("td");

        if (cell) {
            const row = cell.closest<HTMLTableRowElement>("tr");
            const rowIndex = row!.rowIndex - 1;
            setData("educations", [
                ...data.educations.slice(0, rowIndex),
                ...data.educations.slice(rowIndex + 1),
            ]);
        }
    }

    function handleEdit(event: React.MouseEvent<HTMLButtonElement>) {
        const cell = (
            event.target as HTMLElement
        ).closest<HTMLTableCellElement>("td");

        if (cell) {
            const row = cell.closest<HTMLTableRowElement>("tr");
            const rowIndex = row!.rowIndex - 1;
            setEditMode(rowIndex);
            setEditableEducation(data.educations[rowIndex]);
            setShowEditableEducationModal(true);
        }
        setData("educations", data.educations);
    }

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<{
            educations: Education[];
        }>({
            educations: initialData,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("user.updateEducations"));
    };

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Education
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
                                    Education
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className="ms-2 text-dark-blue cursor-pointer"
                                        onClick={() =>
                                            setShowEditableEducationModal(true)
                                        }
                                    />
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.educations.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {`${item.degree} Degree at ${item.institute}`}
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
                                            className="ms-3 text-red-600 hover:text-red-900"
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
                    <Modal show={showEditableEducationModal} onClose={() => {}}>
                        <form
                            className="p-6"
                            id="new-education-form"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Add new education
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
                                            setEditableEducation({
                                                ...editableEducation,
                                                from: e.target.value,
                                            })
                                        }
                                        value={editableEducation.from}
                                        className="mt-1 block w-full"
                                        max={maxDayStr}
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
                                            setEditableEducation({
                                                ...editableEducation,
                                                to: e.target.value,
                                            })
                                        }
                                        max={maxDayStr}
                                        value={editableEducation.to}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group mt-6 flex flex-row gap-3">
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="institute"
                                        value="Institute"
                                    />

                                    <TextInput
                                        id="institute"
                                        type="text"
                                        name="institute"
                                        onChange={(e) =>
                                            setEditableEducation({
                                                ...editableEducation,
                                                institute: e.target.value,
                                            })
                                        }
                                        value={editableEducation.institute}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="degree"
                                        value="Degree"
                                    />

                                    <Select
                                        id="degree"
                                        name="degree"
                                        className="react-select mt-1 w-full !border-none rounded-md shadow-sm"
                                        options={educationLevels.map(
                                            (level: string) => ({
                                                value: level,
                                                label: level,
                                            })
                                        )}
                                        value={
                                            !editableEducation.degree
                                                ? null
                                                : {
                                                      value: editableEducation.degree,
                                                      label: editableEducation.degree,
                                                  }
                                        }
                                        onChange={(e) =>
                                            setEditableEducation({
                                                ...editableEducation,
                                                degree: e!.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="form-group w-full mt-6">
                                <InputLabel htmlFor="field" value="Field" />

                                <TextInput
                                    id="field"
                                    type="text"
                                    name="field"
                                    onChange={(e) =>
                                        setEditableEducation({
                                            ...editableEducation,
                                            field: e.target.value,
                                        })
                                    }
                                    value={editableEducation.field}
                                    className="mt-1 block w-full"
                                    required
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton
                                    onClick={() =>
                                        setShowEditableEducationModal(false)
                                    }
                                >
                                    Cancel
                                </SecondaryButton>

                                <PrimaryButton className="ms-3" type="submit">
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

export default Educations;
