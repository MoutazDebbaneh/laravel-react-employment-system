import { Locale } from "@/enums/app_enums";
import NotificationTable from "./NotificationsTable";
import { UserNotification } from "@/types";

export default function NotificationsList({
    status,
    locale,
    translations,
    auth,
    notifications,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: Auth;
    notifications: UserNotification[];
}) {
    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Notifications
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Your account's notification history
                </p>
            </header>

            <div className="mt-5 relative">
                <NotificationTable notifications={notifications} />
            </div>
        </section>
    );
}
