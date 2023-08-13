import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import React from "react";

interface DeleteModalProps {
    adminId: number;
    showModal: boolean;
    handleClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    adminId,
    showModal,
    handleClose,
}) => {
    return (
        <Modal show={showModal} onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this admin?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once you delete this user, you cannot undo your action.
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <Link
                        href={route("admin.deleteAdmin", adminId)}
                        method="delete"
                    >
                        <DangerButton className="ms-3">Delete</DangerButton>
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
