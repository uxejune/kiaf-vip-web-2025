import { Database } from "./supabase";


type BaseUserAccount = Database["public"]["Tables"]["adminAccount"]["Row"];

export type UserAccount = BaseUserAccount & {
    email: string;
};

export type Vip = {
    mobile: string;
    email: string;
    name: string | null;
    invitation_code: string;
    vip_tier: string;
    regdate: string;
    id: string;
    active_user_id: string;
    guest_mobile: string | null;
    guest_email: string | null;
    gallery_title: string | null;
    barcode: string;
    enter_status: string;
    enter_date: string | null;
    guest_enter_status: string;
    guest_enter_date: string | null;
    partner_title: string | null;
    date_limit: string | null;
}

export const vipListTypeKeys = {
    gallery: 'gallery',
    partner: 'partner',
    canceled: 'canceled'
} as const;

export type VipListTypes = typeof vipListTypeKeys[keyof typeof vipListTypeKeys];

export const userTypeKeys = {
    admin: 'admin',
    gallery: 'gallery',
    partner: 'partner'
} as const;

export type UserTypes = typeof userTypeKeys[keyof typeof userTypeKeys];

export type DateLimitedVipInvitationInsert = Database["public"]["Tables"]["dateLimitedVipInvitation"]["Insert"];
export type DateLimitedVipInvitation = Database["public"]["Tables"]["dateLimitedVipInvitation"]["Row"];

export type Rsvp = {
    post_id: string;
    program_type: string[];
    thumbnail: string;
    post_title: string;
    post_content: string;
    address: string;
    program_date: string;
    total_count: string | null;
    count: string | null;
    companion: string | null;
    applicants: Applicant[] | null;
    timeSlots: TimeSlot[] | null;
    hide: string | null;
    is_main?: "0" | "1";
}

export type Applicant = {
    id: string;
    user_id: string;
    email: string;
    name: string;
    invitation_code: string;
    mobile: string;
    with_companion: number;
    program_id: string;
    ts_id: string | null;
}

export type TimeSlot = {
    id: string;
    program_id: string;
    event_date: string;
    start_time: string;
    end_time: string;
    companion: "0" | "1";
    total_count: number;
    applicants: Applicant[] | null;
}

export const dayTypeKeys = {
    day0: 'day0',
    day1: 'day1',
    day2to4: 'day2to4',
    day5: 'day5',
    day6and: 'day6and'
}

export type DayType = typeof dayTypeKeys[keyof typeof dayTypeKeys];

export const ticketTypesKeys = {
    vip: 'vip',
    guest: 'guest'
} as const;

export type TicketTypes = typeof ticketTypesKeys[keyof typeof ticketTypesKeys];

export const guestInvitationTypeKeys = {
    email: 'email',
    phone: 'phone'
} as const;

export type GuestInvitationTypes = typeof guestInvitationTypeKeys[keyof typeof guestInvitationTypeKeys];

export type CreatedId = {
    id: string | null;
    vip_id?: string | null;
    name: string;
    password: string;
    email: string;
    partner_id: string;
    partner_name?: string | null;
    idCreation?: boolean;
    supabaseRegistration?: boolean;
    vipInvitation?: boolean;
    tier?: string;
}

export type Partner = {
    user_id: string;
    nickname: string;
    description: string;
    quota?: number;
    singleQuota?: number;
    allocationDate?: string;
}



export type Gallery = {
    post_id: string;
    user_id: string;
    title: string;
    payment?: string;
    quota?: number;
    singleQuota?: number;
    boothCode?: string;
    allocationDate?: string;
}

export type Artwork = {
    id: string;
    title: string;
    artist_name: string;
    year: string | null;
    material: string | null;
    size_unit: string | null;
    height: string | null;
    width: string | null;
    depth: string | null;
    desc_ko: string | null;
    desc_en: string | null;
    detail_images: string | null;
    price_krw: string;
    price_usd: string;
    video_embed_link: string | null;
    ko_url: string | null;
    en_url: string | null;
    gallery_title: string | null;
    boothCode?: string;
    ko_text: string | null;
    en_text: string | null;
    status: string;
}

export type AdminVipInviteLog = Database["public"]["Tables"]["adminVipInviteLog"]["Row"];
export type AdminVipInviteLogInsert = Database["public"]["Tables"]["adminVipInviteLog"]["Insert"];

export type Quota = {
    created_at: string;
    id: string;
    quota?: number;
    singleQuota?: number | null; // optional 로 정의
};

export type Banner = {
    id: string;
    banner_type: string;
    image_url: string;
    link: string;
    sort_order: string;
    closeDate?: string;
    image_file?: File;
}