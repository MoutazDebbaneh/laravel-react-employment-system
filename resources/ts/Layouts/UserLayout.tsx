import Dropdown from "@/Components/Dropdown";
import { Locale } from "@/enums/app_enums";
import { PageProps } from "@/types";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

interface UserLayoutProps {
    locale: Locale;
    translations: Translations;
}

export default function UserLayout({ locale, translations }: UserLayoutProps) {
    const auth = usePage<PageProps>().props.auth;
    const notificationsProps = auth.notifications;

    const [notifications, setNotifications] = useState(
        notificationsProps.map(function (notification) {
            return {
                id: notification.id,
                title: (
                    (translations.notifications as Translations)[
                        `type${notification.type}`
                    ] as Translations
                ).heading.toString(),
                description: (
                    (translations.notifications as Translations)[
                        `type${notification.type}`
                    ] as Translations
                ).body.toString(),
            };
        })
    );

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const [isDropDownOpen, setisDropDownOpen] = useState(false);

    const notificationsRef = useRef<HTMLDivElement>(null);

    const dropDownMenuRef = useRef<HTMLDivElement>(null);

    const { post } = useForm({});

    const toggleNotifications = () => {
        if (!isNotificationsOpen && notifications.length > 0) {
            post(route("notifications.markRead"));
        }
        if (isNotificationsOpen) {
            setNotifications([]);
        }
        setIsNotificationsOpen(!isNotificationsOpen);
        setisDropDownOpen(false);
    };

    const toggleMenu = () => {
        setisDropDownOpen(!isDropDownOpen);
        setIsNotificationsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target as Node)
            ) {
                setIsNotificationsOpen(false);
                setNotifications([]);
            }

            if (
                dropDownMenuRef.current &&
                !dropDownMenuRef.current.contains(event.target as Node)
            ) {
                setisDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center relative">
                <button
                    className="relative text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                    onClick={toggleNotifications}
                >
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.0876 17.4333H20.0211L18.6348 16.047C18.4486 15.8608 18.301 15.6398 18.2002 15.3965C18.0995 15.1532 18.0477 14.8924 18.0477 14.6291V11.5131C18.0479 10.2886 17.6684 9.09407 16.9616 8.09409C16.2548 7.09412 15.2553 6.33784 14.1009 5.92938V5.59291C14.1009 5.06953 13.893 4.56759 13.5229 4.1975C13.1528 3.82742 12.6509 3.61951 12.1275 3.61951C11.6041 3.61951 11.1022 3.82742 10.7321 4.1975C10.362 4.56759 10.1541 5.06953 10.1541 5.59291V5.92938C7.85508 6.74242 6.20729 8.93586 6.20729 11.5131V14.6301C6.20729 15.161 5.99614 15.6711 5.6202 16.047L4.23389 17.4333H9.1674M15.0876 17.4333V18.42C15.0876 19.2051 14.7757 19.958 14.2206 20.5132C13.6655 21.0683 12.9126 21.3801 12.1275 21.3801C11.3424 21.3801 10.5895 21.0683 10.0344 20.5132C9.47926 19.958 9.1674 19.2051 9.1674 18.42V17.4333M15.0876 17.4333H9.1674"
                            stroke="#66789C"
                            strokeWidth="1.9734"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-[10px]">
                            {notifications.length}
                        </span>
                    )}
                </button>
                {isNotificationsOpen && (
                    <div
                        ref={notificationsRef}
                        className="absolute top-10 z-50 right-0 w-64 bg-white rounded-md shadow-lg py-2 mt-2"
                    >
                        <div className="px-4 py-2 font-bold text-gray-800">
                            {(
                                translations.notifications as Translations
                            ).title.toString()}
                        </div>
                        {notifications.length == 0 ? (
                            <div className="no-notifications px-4 text-sm">
                                {(
                                    translations.notifications as Translations
                                ).none.toString()}
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="font-bold">
                                        {notification.title}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        {notification.description}
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="px-4 py-2 text-right">
                            <a
                                href={route("user.notifications")}
                                className="text-sm text-gray-500 hover:text-gray-800"
                            >
                                {(
                                    translations.notifications as Translations
                                ).all.toString()}
                            </a>
                        </div>
                    </div>
                )}

                <div className="relative" ref={dropDownMenuRef}>
                    <button
                        className="flex items-center text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                        onClick={toggleMenu}
                    >
                        <img
                            src={auth.profile_picture}
                            alt="Profile Picture"
                            className="rounded-full w-10 ms-2 me-1"
                        />
                        <span className="text-dark-blue font-bold text-[15px] capitalize">
                            {`${auth.user.first_name} ${auth.user.last_name}`}
                        </span>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="ms-2 text-[14px]"
                        />
                    </button>
                    {isDropDownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <Dropdown.Link
                                href={route("user.dashboard")}
                                as="button"
                            >
                                Dashboard
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("user.info") + "#password"}
                                as="button"
                            >
                                Change Password
                            </Dropdown.Link>

                            {locale == Locale.English ? (
                                <Dropdown.Link
                                    href={route("language.set", [
                                        Locale.Arabic,
                                    ])}
                                    as="button"
                                >
                                    العربية
                                </Dropdown.Link>
                            ) : (
                                <Dropdown.Link
                                    href={route("language.set", [
                                        Locale.English,
                                    ])}
                                    as="button"
                                >
                                    English
                                </Dropdown.Link>
                            )}
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
