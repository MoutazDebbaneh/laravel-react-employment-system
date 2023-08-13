import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import React from "react";

interface DeleteModalProps {
    sourceId: number;
    showModal: boolean;
    handleClose: () => void;
    isAPISource?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    sourceId,
    showModal,
    handleClose,
    isAPISource = false,
}) => {
    return (
        <Modal show={showModal} onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this source and all its
                    jobs?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once you delete this source, you cannot undo your acrion.
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <Link
                        href={
                            isAPISource
                                ? route("admin.apiSources.delete", sourceId)
                                : route("admin.scrapeSources.delete", sourceId)
                        }
                        method="delete"
                    >
                        <DangerButton className="ms-3">Decline</DangerButton>
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
