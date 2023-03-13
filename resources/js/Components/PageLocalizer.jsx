export default function PageLocalizer({ locale }) {

    document.lang = locale
    document.dir = locale == "en" ? "ltr" : "rtl"
    return (<></>)

}
