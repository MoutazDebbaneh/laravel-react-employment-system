import { Locale } from '@/enums/app_enums';
import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

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

    var route: typeof ziggyRoute;

    var Ziggy: ZiggyConfig;

}
