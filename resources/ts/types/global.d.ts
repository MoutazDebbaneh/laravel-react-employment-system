import { Locale } from '@/enums/app_enums';
import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';
import { User, UserNotification } from '.';

declare global {

    interface Window {
        axios: AxiosInstance;
    }

    interface Document {
        lang: Locale;
    }

    type Translations = {
        [key: string]: Translations | string
    }

    type Auth = {
        user: User
        notifications: UserNotification[]
        profile_picture: string
    }

    var route: typeof ziggyRoute;

    var Ziggy: ZiggyConfig;

}
