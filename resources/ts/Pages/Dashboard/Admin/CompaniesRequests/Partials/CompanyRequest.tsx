import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faCheck,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { countries } from "countries-list";
import DeclineModal from "./DeclineModal";
import AcceptModal from "./AcceptModal";

interface CompanyData {
    logo: string;
    name: string;
    website: string;
    location: string;
    phoneNumber: string;
    email: string;
    requestId: number;
}

const ExpandableRow: React.FC<CompanyData> = ({
    logo,
    name,
    website,
    location,
    phoneNumber,
    email,
    requestId,
}) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const [showAcceptModal, setAcceptShowModal] = useState(false);
    const [showDeclineModal, setDeclineShowModal] = useState(false);

    const closeAcceptModal = () => setAcceptShowModal(false);
    const openAcceptModal = () => setAcceptShowModal(true);

    const closeDeclineModal = () => setDeclineShowModal(false);
    const openDeclineModal = () => setDeclineShowModal(true);

    return (
        <>
            <div className="border rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-10 h-10 me-2" />
                        <span>{name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleToggleExpand}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                        >
                            {expanded ? (
                                <FontAwesomeIcon icon={faChevronUp} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronDown} />
                            )}
                        </button>
                        <button
                            className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                            onClick={openAcceptModal}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                            onClick={openDeclineModal}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                <div
                    className={`mt-4 overflow-hidden pt-3 border-t border-t-[#B4C0E0] transition-all duration-[4000] ${
                        !expanded ? "hidden" : ""
                    }`}
                >
                    <p>
                        <span className="font-bold">Name:</span> {name}
                    </p>
                    <a href={`mailto:${email}`}>
                        <span className="font-bold">Email:</span> {email}
                    </a>
                    <p>
                        <a href={website} target="_blank">
                            <span className="font-bold">Website:</span>{" "}
                            {website}
                        </a>
                    </p>
                    <p>
                        <span className="font-bold">Location:</span>{" "}
                        {(countries as any)[location].name}
                    </p>
                    <p>
                        <span className="font-bold">Phone Number:</span>{" "}
                        {phoneNumber}
                    </p>
                </div>
            </div>
            <DeclineModal
                requestId={requestId}
                showModal={showDeclineModal}
                handleClose={closeDeclineModal}
            />
            <AcceptModal
                requestId={requestId}
                showModal={showAcceptModal}
                handleClose={closeAcceptModal}
            />
        </>
    );
};

export default ExpandableRow;
