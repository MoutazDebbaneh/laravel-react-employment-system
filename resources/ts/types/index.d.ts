
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    role: number;
    email: string;
    email_verified_at: string;
    user_profile?: UserProfile
}
export interface UserProfile {
    id: number;
    profile_picture: string;
    bio: string | null | undefined;
    website: string | null | undefined;
    gender: boolean | number | string | null | undefined;
    country: string | null | undefined;
    city: string | null | undefined;
    address: string | null | undefined;
    current_position: string | null | undefined;
    education_level: string | null | undefined;
    user_id: number;
    user?: User;
    courses?: Course[];
    experiences?: Experience[];
    educations?: Education[];
    skills?: Skill[];
    languages?: Language[];
    categories?: JobCategory[];
    social_link?: SocialLink;
    cv_file: File | string | null | undefined;

}

export interface Company {
    id: number;
    name: string | null | undefined;
    email: string | null | undefined;
    logo: File | string | null | undefined;
    website: string | null | undefined;
    phone: string | null | undefined;
    headquarters: string | null | undefined;
    company_verified_at: string | Date | null | undefined
}
export interface CompanyVerificationRequest {
    id: number;
    is_accepted: boolean | null | undefined;
    company_id: number;
    company?: Company 
}

export interface Experience {
    company: string;
    position: string;
    description: string;
    from: string;
    to: string;
}

export interface Course {
    institute: string;
    certificate_name: string;
    from: string;
    to: string;
}

export interface Education {
    institute: string;
    degree: string;
    field: string;
    from: string;
    to: string;
}
export interface Skill {
    name: string;
}
export interface Language {
    name_en: string;
    name_ar: string;
}

export interface SocialLink {
    facebook: string | undefined | null;
    linkedin: string | undefined | null;
    instagram: string | undefined | null;
    twitter: string | undefined | null;
    telegram: string | undefined | null;
}
export interface Source {
    id: number;
    name: string;
    logo: string;
}

export interface Job {
        id?: number | undefined
        title: string | null | undefined;
        location: string | null | undefined;
        description: string | null | undefined;
        requirements: string | null | undefined;
        benefits: string | null | undefined;
        experience: number | null | undefined;
        min_salary: number | null | undefined;
        max_salary: number | null | undefined;
        min_age: number | null | undefined;
        max_age: number | null | undefined;
        gender: boolean | number | string | null | undefined;
        display_image?: string | File | null | undefined;
        post_date?: string | null | undefined;
        expiration_date: string | null | undefined;
        source_type?: number | null | undefined;
        source_url?: string | null | undefined;
        source_logo?: string | null | undefined;
        job_category_id? : number;
        job_category? : JobCategory
        job_types? : JobType[]
        company?: Company 
        source?: Source
        created_at: string | null | undefined
        updated_at: string | null | undefined
}
export interface JobCategory {
        id: number;
        name_en: string;
        name_ar: string;
}
export interface JobType {
        id: number;
        name_en: string;
        name_ar: string;
}
export interface UserNotification {
        id: number;
        user_id: number;
        type: number;
        related_id: number;
        created_at: string;
        updated_at: string;
        related_url?: string;
}
export interface JobApplication {
        id: number;
        user_id: number;
        job_id: number;
        created_at: string;
        updated_at: string;
        job?: Job
        user?: User
}
