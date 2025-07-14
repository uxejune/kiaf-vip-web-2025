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
import { DayType, dayTypeKeys } from '@/types/collections';
import AppRedirect from '@/components/Vip/AppRedirect';
import GoogleAppRedirect from '@/components/Vip/GoogleAppRedirect';
import AppRedirect2nd from '@/components/Vip/AppRedirect2nd';
import AppRedirect3rd from '@/components/Vip/AppRedirect3rd';
interface PageProps {
    searchParams: {
        a: string;
        s: string;
    }
}

export const metadata: Metadata = {
    title: "Kiaf SEOUL VIP PASS",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ a?: string, s?: string }>; }) {

    const { a, s } = await searchParams;

    if (!a || !s) {
        return (
            <p>undefined code.</p>
        )
    }
    const t = await getTranslations('VipTicket');



    return (
        <AppRedirect3rd deepLink={a} storeLink={s} />
    )

}
