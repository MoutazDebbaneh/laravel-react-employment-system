import PageLocalizer from "@/Components/PageLocalizer";
import DefaultLayout from "@/Layouts/DefaultLayout";
import Container from "@/Utils/Container";
import { Locale } from "@/enums/app_enums";
import { Head } from "@inertiajs/react";
import "../../../css/animation.css";

export default function Terms({
    locale,
    translations,
    auth,
    activeLink,
}: {
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink: string;
}) {
    return (
        <DefaultLayout
            locale={locale}
            translations={translations.navbar as Translations}
            auth={auth}
            activeLink={activeLink}
        >
            <PageLocalizer locale={locale} />
            <Head
                title={(translations.navbar as Translations).title.toString()}
            />

            <div className="bg-[url('/resources/images/bg-banner.svg')] bg-no-repeat bg-left-top bg-cover fixed -z-50 w-full top-0 right-0 min-h-[835px]"></div>
            <Container className="max-w-full flex justify-center flex-col !min-h-[500px]">
                <div>
                    <h1 className="text-[1.8rem] text-dark-blue font-extrabold max-w-10">
                        {(translations.navbar as Translations).terms.toString()}
                    </h1>
                    <p className="about">
                        Eiusmod eiusmod mollit deserunt cillum cupidatat dolore
                        veniam ullamco incididunt incididunt anim est minim. Ut
                        ipsum dolor magna proident qui veniam. Magna consectetur
                        pariatur nostrud ad ut nostrud sint. Aliquip quis
                        commodo consectetur laborum eu minim. Laborum ipsum
                        deserunt culpa incididunt exercitation qui enim
                        incididunt. Laboris ea esse labore officia non labore
                        est ex aliqua ut exercitation dolor do. Commodo esse id
                        labore nisi cupidatat id laboris. Sint fugiat non nulla
                        sunt ut. Id laboris id ex in fugiat est esse laborum
                        veniam commodo est duis id irure. Nostrud enim culpa
                        fugiat occaecat minim dolor consequat. Magna officia
                        minim nostrud voluptate amet consequat nostrud labore
                        proident exercitation aute sint laborum Lorem. Id
                        deserunt veniam pariatur esse in esse incididunt ipsum
                        cillum voluptate. Ipsum exercitation et irure anim anim
                        elit. Adipisicing est sit pariatur dolor excepteur est.
                        Ex laboris adipisicing excepteur excepteur eu dolore
                        dolor nisi enim officia exercitation Lorem consequat
                        adipisicing. Elit adipisicing aliqua sint irure irure.
                        Deserunt esse cupidatat esse in nisi culpa. Fugiat anim
                        non anim ut fugiat mollit velit eiusmod adipisicing
                        deserunt tempor commodo voluptate tempor. Ea dolore
                        magna ullamco sint eiusmod veniam eu cillum velit
                        aliquip irure pariatur non. Aute nisi qui sit
                        reprehenderit. Magna laborum nulla ipsum id proident
                        officia cillum nulla elit sint. Eu ea adipisicing culpa
                        et sint occaecat. Incididunt sint laborum et ut. Et enim
                        ad deserunt consectetur duis. Anim tempor commodo ipsum
                        aute eiusmod cupidatat velit labore. Elit anim in eu est
                        dolor ea dolor eiusmod anim. Laborum ex sit et
                        reprehenderit enim consequat esse veniam est in tempor.
                    </p>
                </div>
            </Container>
        </DefaultLayout>
    );
}
