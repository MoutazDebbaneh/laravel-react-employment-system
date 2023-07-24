
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
