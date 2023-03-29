import { Link, Head } from '@inertiajs/react';
import UnAuthenticatedLayout from '@/Layouts/UnAuthenticatedLayout';
import { Locale } from '@/enums/app_enums';

export default function Home(props: { locale: Locale, translations: Record<string, any> }) {
    return (
        <UnAuthenticatedLayout
            header={null}
            locale={props.locale}
            translations={props.translations}
        >
            <Head title={props.translations.title} />
            <div className="Home">Home</div>
        </UnAuthenticatedLayout>
    )
}
