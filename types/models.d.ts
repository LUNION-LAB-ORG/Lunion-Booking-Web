export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum ProfileDocumentType {
    PASSPORT = 'PASSPORT',
    ID_CARD = 'ID_CARD',
    DRIVER_LICENSE = 'DRIVER_LICENSE',
}

export enum OrganisationCategory {
    HOTEL = 'HOTEL',
    RESIDENCE = 'RESIDENCE',
    GUEST_HOUSE = 'GUEST_HOUSE',
}

export enum OrganisationDocumentType {
    BUSINESS_LICENSE = 'BUSINESS_LICENSE',
    TAX_ID = 'TAX_ID',
    REGISTRATION = 'REGISTRATION',
}

export enum InvitationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export interface User {
    id: string;
    role: string;
    email: string;
    is_anonymous: boolean;
    is_super_admin?: boolean | null;
    last_sign_in_at?: Date | null;
    confirmed_at?: Date | null;
    deleted_at?: Date | null;
    created_at: Date;
    updated_at?: Date | null;

    otpToken?: OtpToken[];
    profile?: Profile | null;
}

export interface OtpToken {
    id: string;
    token: string;
    userId?: string | null;
    email?: string | null;
    counter?: number | null;

    user?: User | null;

    created_at: Date;
    updated_at: Date;
}

export interface CounterOtp {
    id: string;
    counter: number;
}

export interface Audit {
    id: string;
    activity: string;
    ip: string;
    member_id?: string | null;

    created_at: Date;
    updated_at: Date;

    Member?: Member | null;
}

export interface Profile {
    id: string;
    first_name: string;
    last_name?: string | null;
    email?: string | null;
    avatar_url?: string | null;
    country?: string | null;
    city?: string | null;
    birthdate?: Date | null;
    bio?: string | null;
    address?: string | null;
    phone?: string | null;
    job?: string | null;
    gender?: Gender | null;
    document_front_url?: string | null;
    document_back_url?: string | null;
    document_type?: ProfileDocumentType | null;
    created_at: Date;
    updated_at?: Date | null;

    organisation?: Organisation[];
    members?: Member[];
    subscriptions?: ProfileSubscription[];
    invitations?: Invitation[];
    user?: User | null;
    user_id?: string | null;
}

export interface Organisation {
    id: string;
    name: string;
    description?: string | null;
    logo?: string | null;
    country?: string | null;
    city?: string | null;
    email?: string | null;
    manager_name?: string | null;
    manager_email?: string | null;
    phone?: string | null;
    address?: string | null;
    category?: OrganisationCategory | null;
    document?: string | null;
    document_number?: string | null;
    document_type?: OrganisationDocumentType | null;
    document_date_start?: Date | null;
    document_date_valid?: Date | null;
    reference?: string | null;
    created_at: Date;
    updated_at?: Date | null;

    profile?: Profile | null;
    members?: Member[];
    roles?: Role[];
    properties?: Property[];
    invitations?: Invitation[];
    group_properties?: GroupProperty[];
}
export interface Member {
    id: string;
    organisation_id: string;
    profile_id: string;
    role_id: string;
    created_at: Date;
    updated_at: Date;

    organisation: Organisation;
    profile: Profile;
    role: Role;
    audit?: Audit[];
}

export interface Action {
    id: string;
    module_id: string;
    name: string; // ex: "edit_profile", "add_client"
    description?: string | null;
    is_public: boolean;
    title?: string | null; // ex: "Peut éditer un client ?"

    module: Module;
    role_actions?: RoleAction[];
}

export interface Role {
    id: string;
    organisation_id?: string | null;
    name: string;
    is_predefined: boolean;
    created_at: Date;

    organisation?: Organisation | null;
    members?: Member[];
    role_actions?: RoleAction[];
    invitations?: Invitation[];
}

export interface RoleAction {
    id: string;
    role_id: string;
    action_id: string;

    role: Role;
    action: Action;
}

export interface Module {
    id: string;
    name: string;
    title: string;
    description?: string | null;
    created_at: Date;

    actions?: Action[];
    plan_modules?: PlanModule[];
}

export interface Plan {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    price_year: number;
    max_organisations: number;
    max_members_per_organisation: number;
    created_at: Date;
    updated_at: Date;

    plan_modules?: PlanModule[];
    subscriptions?: ProfileSubscription[];
}

export interface PlanModule {
    id: string;
    plan_id: string;
    module_id: string;

    plan: Plan;
    module: Module;
}

export interface ProfileSubscription {
    id: string;
    profile_id: string;
    plan_id: string;
    start_date: Date;
    end_date?: Date | null;
    is_active: boolean;
    is_trial: boolean;
    price: number;
    count: number;
    created_at: Date;
    updated_at: Date;

    profile: Profile;
    plan: Plan;
}

export interface GroupProperty {
    id: string;
    name: string;
    description?: string | null;
    address?: string | null;
    price?: number | null; // Decimal(12, 2)

    properties?: Property[];
    organisation: Organisation;
    organisation_id: string;

    created_at: Date;
    updated_at: Date;
}

export interface TypeProperty {
    id: string;
    name: string;

    properties?: Property[];

    created_at: Date;
    updated_at: Date;
}

export interface Property {
    id: string;
    organisation_id: string;
    name: string;
    description?: string | null;
    address?: string | null;
    price?: number | null; // Decimal(12, 2)

    created_at: Date;
    created_by?: string | null;
    updated_at: Date;
    updated_by?: string | null;

    item_properties?: ItemProperty[];
    organisation: Organisation;
    groupProperty?: GroupProperty | null;
    group_property_id?: string | null;
    typeProperty?: TypeProperty | null;
    type_Property_id?: string | null;
}

export interface ItemProperty {
    id: string;
    name: string;

    field_proprieties?: FieldPropriety[];
    property: Property;
    property_id: string;

    created_at: Date;
    updated_at: Date;
}

export interface FieldPropriety {
    id: string;
    name: string;
    value: string;

    itemProperty?: ItemProperty | null;
    item_property_id?: string | null;

    created_at: Date;
    updated_at: Date;
}

export interface Invitation {
    id: string;
    organisation_id?: string | null;
    email: string;
    role_id?: string | null;
    status: InvitationStatus;
    created_at: Date;

    organisation?: Organisation | null;
    role?: Role | null;
    profile?: Profile | null;
    profile_id?: string | null;
}
