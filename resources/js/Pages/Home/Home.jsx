import { Link, Head } from '@inertiajs/react';
import UnAuthenticatedLayout from '@/Layouts/UnAuthenticatedLayout';

export default function Home(props) {
    return (
        <UnAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={null}
            locale={props.locale}
            translations={props.translations}
        >
            <Head title={props.translations.title} />
            <div className="Home spaci">Home</div>
        </UnAuthenticatedLayout>
    )
}
