import { Locale } from "@/enums/app_enums"
export default function PageLocalizer({ locale }: { locale: Locale }) {

    document.lang = locale
    document.dir = locale == Locale.English ? "ltr" : "rtl"
    return (<></>)

}
