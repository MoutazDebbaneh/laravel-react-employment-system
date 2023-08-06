import PrimaryButton from "@/Components/PrimaryButton";
import { Job } from "@/types";
import {
    faEdit,
    faPlusCircle,
    faTrash,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler, useState } from "react";
import ConfirmDelete from "./ConfirmDelete";

const JobsList: React.FC<{ initialData: Job[] }> = ({ initialData }) => {
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const closeConfirmDeleteModal = () => setShowConfirmDeleteModal(false);
    const openConfirmDeleteModal = () => setShowConfirmDeleteModal(true);

    return (
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full lg:w-[40rem] md:mx-auto ">
            <section>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Jobs</h2>
                </header>

                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-[14px] font-medium text-gray-500 tracking-wider"
                                >
                                    Job Opportunities
                                    <Link href={route("company.jobs.create")}>
                                        <FontAwesomeIcon
                                            icon={faPlusCircle}
                                            className="ms-2 text-dark-blue cursor-pointer"
                                        />
                                    </Link>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {initialData &&
                                initialData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                                            <Link
                                                href={route(
                                                    "company.job.applications",
                                                    item.id
                                                )}
                                            >
                                                <button className="text-green-700 hover:text-green-800">
                                                    <span className="sr-only">
                                                        Applications
                                                    </span>
                                                    <FontAwesomeIcon
                                                        icon={faUserGroup}
                                                    />
                                                </button>
                                            </Link>

                                            <Link
                                                href={route(
                                                    "company.jobs.edit",
                                                    item.id
                                                )}
                                            >
                                                <button className="ms-3 text-indigo-600 hover:text-indigo-900">
                                                    <span className="sr-only">
                                                        Edit
                                                    </span>
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                            </Link>

                                            <button
                                                className="ms-3 text-red-600 hover:text-red-900"
                                                onClick={openConfirmDeleteModal}
                                            >
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        </td>
                                        <ConfirmDelete
                                            jobId={item.id!}
                                            showModal={showConfirmDeleteModal}
                                            handleClose={
                                                closeConfirmDeleteModal
                                            }
                                        />
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default JobsList;
