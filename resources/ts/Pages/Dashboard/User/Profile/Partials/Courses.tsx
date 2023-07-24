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

type Course = {
    institute: string;
    certificate_name: string;
    from: string;
    to: string;
};

const Courses: React.FC<{ initialData: Course[] }> = ({ initialData }) => {
    const [showEditableCourseModal, setShowEditableCourseModal] =
        useState(false);
    const [editMode, setEditMode] = useState<boolean | number>(false);

    const [editableCourse, setEditableCourse] = useState<Course>({
        institute: "",
        certificate_name: "",
        from: "",
        to: "",
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (editMode === false) {
            setData("courses", [...data.courses, editableCourse]);
        } else {
            const index = editMode as number;
            setData("courses", [
                ...data.courses.slice(0, index),
                editableCourse,
                ...data.courses.slice(index + 1),
            ]);
        }
        setEditableCourse({
            institute: "",
            certificate_name: "",
            from: "",
            to: "",
        });
        setShowEditableCourseModal(false);
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        const cell = (
            event.target as HTMLElement
        ).closest<HTMLTableCellElement>("td");

        if (cell) {
            const row = cell.closest<HTMLTableRowElement>("tr");
            const rowIndex = row!.rowIndex - 1;
            setData("courses", [
                ...data.courses.slice(0, rowIndex),
                ...data.courses.slice(rowIndex + 1),
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
            setEditableCourse(data.courses[rowIndex]);
            setShowEditableCourseModal(true);
        }
        setData("courses", data.courses);
    }

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<{
            courses: Course[];
        }>({
            courses: initialData,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("user.updateCourses"));
    };

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Courses
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
                                    Course
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className="ms-2 text-dark-blue cursor-pointer"
                                        onClick={() =>
                                            setShowEditableCourseModal(true)
                                        }
                                    />
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.courses.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {`${item.certificate_name} at ${item.institute}`}
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
                    <Modal show={showEditableCourseModal} onClose={() => {}}>
                        <form
                            className="p-6"
                            id="new-course-form"
                            onSubmit={handleSubmit}
                        >
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Add new course
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
                                            setEditableCourse({
                                                ...editableCourse,
                                                from: e.target.value,
                                            })
                                        }
                                        value={editableCourse.from}
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
                                            setEditableCourse({
                                                ...editableCourse,
                                                to: e.target.value,
                                            })
                                        }
                                        value={editableCourse.to}
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
                                            setEditableCourse({
                                                ...editableCourse,
                                                institute: e.target.value,
                                            })
                                        }
                                        value={editableCourse.institute}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="certificate_name"
                                        value="Certificate Name"
                                    />

                                    <TextInput
                                        id="certificate_name"
                                        type="text"
                                        name="certificate_name"
                                        onChange={(e) =>
                                            setEditableCourse({
                                                ...editableCourse,
                                                certificate_name:
                                                    e.target.value,
                                            })
                                        }
                                        value={editableCourse.certificate_name}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton
                                    onClick={() =>
                                        setShowEditableCourseModal(false)
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

export default Courses;
