import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import React from "react";

interface ConfirmDeleteProps {
    jobId: number;
    showModal: boolean;
    handleClose: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
    jobId,
    showModal,
    handleClose,
}) => {
    return (
        <Modal show={showModal} onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this job?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once you submit this action, you cannot undo it.
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <Link
                        href={route("company.jobs.delete", jobId)}
                        method="delete"
                        as="button"
                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ms-3"
                    >
                        Delete
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDelete;
