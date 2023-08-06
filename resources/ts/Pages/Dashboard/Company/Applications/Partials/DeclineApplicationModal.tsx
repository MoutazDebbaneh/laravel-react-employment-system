import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link } from "@inertiajs/react";
import React from "react";

interface DeclineApplicationModalProps {
    applicationId: number;
    showModal: boolean;
    handleClose: () => void;
}

const DeclineApplicationModal: React.FC<DeclineApplicationModalProps> = ({
    applicationId,
    showModal,
    handleClose,
}) => {
    return (
        <Modal show={showModal} onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to decline this application?
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once you decline this application, you cannot reaccept it.
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <Link
                        href={route("company.application.action")}
                        method="post"
                        data={{ id: applicationId, action: 0 }}
                    >
                        <DangerButton className="ms-3">Decline</DangerButton>
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default DeclineApplicationModal;
