import Base64Image from '@/components/Vip/Base64Image';
import { decrypt, encrypt } from '@/lib/cryption';
import QRCode from "react-qr-code";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dateChecker, isAfterNextMidnight } from '@/lib/utils';
import GuestInviteButton from '@/components/Vip/GuestInviteButton';
import { revalidateTag } from 'next/cache'
import { Metadata } from 'next';
import VipTicket from '@/components/Vip/VipTicket';
import VipPartners from '@/components/Vip/VipPartners';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Spinner from '@/components/General/Spinner/Spinner';
import { DateLimitedVipInvitation, DayType, dayTypeKeys } from '@/types/collections';
import { createClient } from '@/utils/supabase/server';


interface PageProps {
    params: {
        locale: string;
    }
    searchParams: {
        u: string;
    }
}

export const metadata: Metadata = {
    title: "Kiaf SEOUL VIP PASS",
};

const vipTicketDetail = async (invitationCode: string) => {

    // revalidateTag('collection'); //prevent Caching 

    const urlencoded = new URLSearchParams();

    const requestOptions = {
        method: "POST",
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
        next: { tags: ['collection'] }
    };

    try {
        const res = await fetch(`https://kiafvip.kiaf.org/api/invite/ticket_detail?invitation_code=${invitationCode}`, requestOptions)
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
}



export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ u?: string }>;
}) {
    const { u } = await searchParams;
    const { locale } = await params;

    const t = await getTranslations('VipTicket');

    if (!u) {
        return (
            <p>undefined code.</p>
        )
    }

    const encryptedInvitationCode = encrypt(u);

    const encodedParameter = encodeURIComponent(u.toString());

    const ticketData = await vipTicketDetail(encryptedInvitationCode);


    let hasPassedNextMidnight: boolean = false;

    if (ticketData.guest_accept_datetime) {
        hasPassedNextMidnight = isAfterNextMidnight(ticketData.guest_accept_datetime);
    }

    const isGuestInvited = ticketData.guest_invite_datetime;
    const isGuestAllowd = !ticketData.guest_accept_datetime || hasPassedNextMidnight

    const today: DayType = dateChecker()

    const entryInfo = () => {
        switch (today) {
            case "day0":
                return t("entryInfoBefore4Sep");
            case "day1":
            case "day2to4":
                return t("entryInfo4to7Sep");
            case "day5":
                return t("entryInfo8Sep");
            default:
                return "";
        }
    }


    const friezeEntryInfo = () => {
        if (today == "day1") {
            return t("friezeEntryInfo");
        } else {
            return null
        }
    }

    //check date limit
    // const supabase = await createClient();

    // const { data: dateLimitedVipInvitation, error: errorDateLimitedVipInvitation } = await supabase
    //     .from("dateLimitedVipInvitation")
    //     .select("*")
    //     .eq("code", u)
    //     .single();

    // const dateLimitedVipInvitationData: DateLimitedVipInvitation | null = dateLimitedVipInvitation ?? null;

    // console.log(dateLimitedVipInvitationData);

    if (ticketData.status) {
        return (
            <div className='flex justify-center  w-full h-screen bg-neutral-100'
                style={{
                    backgroundImage: "url('/imgs/vip_ticket_bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >

                <div className=" py-7 w-full max-w-[640px]  flex flex-col justify-center items-center gap-6">
                    <VipTicket
                        qrCode={ticketData.qr_code}
                        entryInfo={entryInfo()}
                        locationInfo={t("locationInfo")}
                        friezeEntryInfo={friezeEntryInfo()}
                        ticketType="vip"
                        warningInfo={t("warningInfo")}
                        // dayLimitedTicketMessage={dateLimitedVipInvitationData ? t("1dayTicketMessage") : null}
                    />

                    {/* {dateLimitedVipInvitationData && <p className='text-center'><span className='font-bold'>{dateLimitedVipInvitationData.date}</span><br /> {t("1dayTicketMessage")}</p>} */}

                    
                    
                    <div className="text-white text-center w-full">
                        <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
                    </div>

                </div>
            </div>


        )
    } else {
        return (
            <div className='flex flex-col gap-3 justify-center items-center w-full h-screen p-4 text-center'>
                <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
                <p>{t("expiredOrWrongInvitation")}</p>
            </div>
        )
    }

}