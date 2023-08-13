import { User } from "@/types";
import {
    faChevronDown,
    faChevronUp,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

interface AdminListRowData {
    admin: User;
}

export default function AdminListRow({ admin }: AdminListRowData) {
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const [showDeleteModal, setDeleteShowModal] = useState(false);

    const closeDeleteModal = () => setDeleteShowModal(false);
    const openDeleteModal = () => setDeleteShowModal(true);

    return (
        <>
            <div className="border rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                        <img
                            src="/storage/images/users/default_user.png"
                            alt="Logo"
                            className="w-10 h-10 me-2"
                        />
                        <span className="capitalize">{`${admin.first_name} ${admin.last_name}`}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleToggleExpand}
                            className="text-green-500 hover:text-green-600"
                        >
                            {expanded ? (
                                <FontAwesomeIcon icon={faChevronUp} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronDown} />
                            )}
                        </button>
                        <Link href={route("admin.edit", admin.id)}>
                            <FontAwesomeIcon
                                icon={faPen}
                                className="text-blue-600 hover:text-blue-900"
                            />
                        </Link>
                        <button onClick={openDeleteModal}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-500 hover:text-red-900"
                            />
                        </button>
                    </div>
                </div>

                <div
                    className={`mt-4 overflow-hidden pt-3 border-t border-t-[#B4C0E0] transition-all duration-[4000] ${
                        !expanded ? "hidden" : ""
                    }`}
                >
                    <p>
                        <span className="font-bold">First Name:</span>{" "}
                        {admin.first_name}
                    </p>
                    <p>
                        <span className="font-bold">Last Name:</span>{" "}
                        {admin.last_name}
                    </p>
                    <a href={`mailto:${admin.email}`}>
                        <span className="font-bold">Email:</span> {admin.email}
                    </a>
                </div>
            </div>
            <DeleteModal
                adminId={admin.id}
                showModal={showDeleteModal}
                handleClose={closeDeleteModal}
            />
        </>
    );
}
