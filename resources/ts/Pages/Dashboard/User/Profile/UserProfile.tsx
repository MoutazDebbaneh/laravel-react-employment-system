import { Locale } from "@/enums/app_enums";
import UserDashboardLayout from "../Partials/UserDashboardLayout";
import About from "./Partials/About";
import Experiecnces from "./Partials/Experiences";
import Education from "./Partials/Education";
import PersonalInformation from "./Partials/PersonalInformation";
import Courses from "./Partials/Courses";

type Experience = {
    company: string;
    position: string;
    description: string;
    from: string;
    to: string;
};

type Education = {
    institute: string;
    degree: string;
    field: string;
    from: string;
    to: string;
};

type Course = {
    institute: string;
    certificate_name: string;
    from: string;
    to: string;
};

export default function UserProfile({
    status,
    locale,
    translations,
    auth,
    activeLink,
    langs,
    profile,
    profile_skills,
    profile_languages,
    experiences,
    educations,
    courses,
}: {
    status?: string;
    locale: Locale;
    translations: Translations;
    auth: any;
    activeLink?: string | null;
    langs: any;
    profile: any;
    profile_skills: any;
    profile_languages: any;
    experiences: Experience[];
    educations: Education[];
    courses: Course[];
}) {
    return (
        <>
            <UserDashboardLayout
                locale={locale}
                translations={translations}
                auth={auth}
                activeLink={activeLink}
            >
                <div className="w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                    <PersonalInformation
                        status={status}
                        locale={locale}
                        translations={translations}
                        langs={langs}
                        profile={profile}
                        profile_skills={profile_skills}
                        profile_languages={profile_languages}
                    />

                    <About
                        status={status}
                        locale={locale}
                        translations={translations}
                        langs={langs}
                    />

                    <Experiecnces initialData={experiences} />

                    <Education initialData={educations} />

                    <Courses initialData={courses} />
                </div>
            </UserDashboardLayout>
        </>
    );
}
