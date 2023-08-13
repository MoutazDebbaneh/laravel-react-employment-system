import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faPen,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ScrapeSource } from "@/types";
import DeleteModal from "./DeleteModal";
import { Link } from "@inertiajs/react";

export default function ScrapeSourceRow({
    scrapeSource,
}: {
    scrapeSource: ScrapeSource;
}) {
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const closeDeleteModal = () => setDeleteShowModal(false);
    const openDeleteModal = () => setDeleteShowModal(true);

    return (
        <>
            <div className="border rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                        <img
                            src={scrapeSource.logo as string}
                            alt="Logo"
                            className="w-10 h-10 me-2"
                        />
                        <span>{scrapeSource.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route(
                                "admin.scrapeSources.edit",
                                scrapeSource.id
                            )}
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
                    sourceId={scrapeSource.id}
                    showModal={showDeleteModal}
                    handleClose={closeDeleteModal}
                    isAPISource={true}
                />
            </div>
        </>
    );
}
