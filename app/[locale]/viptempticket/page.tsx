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
import { DayType, dayTypeKeys } from '@/types/collections';
import { headers } from 'next/headers';
import Link from 'next/link';
import AppOpenButton from '@/components/Vip/AppOpenButton';
import LocaleSwitch from '@/components/General/LocaleSwitch';
import { TicketPercent } from 'lucide-react';
import VipTempTicket from '@/components/Vip/VipTempTicket';
import moment from 'moment-timezone';

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

function getDeviceType(userAgent: string) {
    if (userAgent.match(/Android/i)) {
        return 'android';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
        return 'ios';
    } else {
        return 'others';
    }
}

const vipTicketDetail = async (invitationCode: string) => {
    const urlencoded = new URLSearchParams();

    const requestOptions = {
        method: "POST",
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
        next: { tags: ['collection'] }
    };

    revalidateTag('collection'); //prevent Caching 

    try {
        const res = await fetch(`https://kiafvip.kiaf.org/api/invite/ticket_detail?invitation_code=${invitationCode}`, requestOptions);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
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

    if (!u) {
        return (
            <p>undefined code.</p>
        )
    }

    const t = await getTranslations('VipTicket');


    const encodedParameter = encodeURIComponent(u.toString());



    const ticketData = await vipTicketDetail(encodedParameter);

    if (!ticketData || !ticketData.status) {
        return (
            <div className='flex flex-col justify-center items-center w-full h-screen'>
                <p>{t("expiredOrWrongInvitation")}</p>
            </div>
        );
    }

    const decryptedInvitationCode = decrypt(u);

    let hasPassedNextMidnight: boolean = false;
    if (ticketData.guest_accept_datetime) {
        hasPassedNextMidnight = isAfterNextMidnight(ticketData.guest_accept_datetime);
    }

    const isGuestInvited = ticketData.guest_invite_datetime != null;
    const guestInfo = ticketData.guest_mobile || ticketData.guest_email;
    const isGuestAllowed = ticketData.guest_accept_datetime == null || hasPassedNextMidnight;

    const today =  moment().tz('Asia/Seoul');

    
    const formattedDate = today.format('YYYY. M. D');

    console.log('today :', formattedDate)


    const mobileAppDownloadLink = {
        ios: "https://apps.apple.com/app/kiaf-vip/id6504750049",
        aos: "https://play.google.com/store/apps/details?id=org.kiaf.kiafvip",
    };


    return (
        <div className='flex sm:py-12 justify-center w-full'>

            <div className="py-7 w-full max-w-[640px] sm:rounded-md flex flex-col gap-6">


                <VipTempTicket
                    qrCode={ticketData.qr_code}
                    entryInfo={`${formattedDate}`}
                    locationInfo={"임시티켓, 당일만 사용 가능"}
                    ticketType="vip"
                    warningInfo={t("warningInfo")}
                />

                <div className="text-white text-center w-full">
                    <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
                </div>
            </div>
        </div>
    );
}
