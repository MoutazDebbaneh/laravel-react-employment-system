import { APISource } from "@/types";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function APISourceRow({ apiSource }: { apiSource: APISource }) {
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const closeDeleteModal = () => setDeleteShowModal(false);
    const openDeleteModal = () => setDeleteShowModal(true);

    return (
        <>
            <div className="border rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                        <img
                            src={apiSource.logo as string}
                            alt="Logo"
                            className="w-10 h-10 me-2"
                        />
                        <span>{apiSource.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route("admin.apiSources.edit", apiSource.id)}
                        >
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

                <DeleteModal
                    sourceId={apiSource.id}
                    showModal={showDeleteModal}
                    handleClose={closeDeleteModal}
                />
            </div>
        </>
    );
}
