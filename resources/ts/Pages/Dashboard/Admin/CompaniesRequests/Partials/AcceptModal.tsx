import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import React from "react";

interface AcceptModalProps {
    requestId: number;
    showModal: boolean;
    handleClose: () => void;
}

const AcceptModal: React.FC<AcceptModalProps> = ({
    requestId,
    showModal,
    handleClose,
}) => {
    return (
        <Modal show={showModal} onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to accept this request?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once you accept this request, you cannot redecline it.
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <Link
                        href={route("admin.request.action")}
                        method="post"
                        data={{ id: requestId, action: 1 }}
                    >
                        <PrimaryButton className="ms-3">Confirm</PrimaryButton>
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default AcceptModal;
