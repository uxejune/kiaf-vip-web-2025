import Base64Image from '@/components/Vip/Base64Image';
import { decrypt } from '@/lib/cryption';
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
import { getTranslations } from 'next-intl/server';
import VipTicket from '@/components/Vip/VipTicket';
import VipPartners from '@/components/Vip/VipPartners';
import Image from 'next/image';
import { DayType, dayTypeKeys } from '@/types/collections';
import { CircleBackslashIcon } from '@radix-ui/react-icons';


const testInvitationCode = "12345"

async function ticket_detail(invitationCode: string) {
    if (invitationCode == testInvitationCode) {
        return {
            "user_id": "34567",
            "email": "mcnoh@blueshift.co.kr",
            "name": "artitest1",
            "phone": "01012345678",
            "invitation_code": "dsfld;sgp",
            "invitation_accpet_datetime": "2023.09.07 00:00:00",
            "invited_from": "kiaf_vip",
        }
    } else {
        return {
            "status": false,
            "message": 401
        }
    }

}

const guestTicketDetail = async (invitationCode: string) => {

    // revalidateTag('collection'); //prevent Caching 

    const urlencoded = new URLSearchParams();

    const requestOptions = {
        method: "POST",
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
        next: { tags: ['collection'] }
    };


    try {
        const res = await fetch(`https://kiafvip.kiaf.org/api/invite/ticket_detail?invitation_code=${invitationCode}&type=guest`, requestOptions)
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
}


interface PageProps {
    params: {
        locale: string;
    }
    searchParams: {
        u: string;
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


    const encodedParameter = encodeURIComponent(u.toString());



    const ticketData = await guestTicketDetail(encodedParameter);

    const today: DayType = dateChecker()


    const entryInfo = () => {
        if (today == "day0") {
            return t("entryInfoBefore4Sep")
        } else if (today == "day1") {
            return t("entryInfo4to7Sep")
        } else if (today == "day2to4") {
            return t("entryInfo4to7Sep")
        } else {
            return t("entryInfo8Sep")
        }
    }

    const friezeEntryInfo = () => {
        if (today == "day1") {
            return t("friezeEntryInfo");
        } else {
            return null
        }
    }




    if (ticketData.status != false) {
        return (
            <div className='flex sm:py-12 justify-center w-full  max-sm:h-screen max-sm:items-center max-sm:bg-neutral-100'>

                <div className="bg-neutral-100 py-7 w-full max-w-[640px] sm:rounded-md  flex flex-col gap-6
                "
                style={{
                    backgroundImage: "url('/imgs/vip_ticket_bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
                
                >
                    <VipTicket
                        qrCode={ticketData[0].qrcode}
                        entryInfo={entryInfo()}
                        locationInfo={t("locationInfo")}
                        friezeEntryInfo={friezeEntryInfo()}
                        ticketType="guest"
                        warningInfo={t("warningInfo")}
                    />
                    
                    {/* <VipPartners/> */}
                    <div className="text-white text-center w-full">
                        <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
                    </div>

                </div>
            </div>


        )
    } else {
        return (
            <div className='flex flex-col justify-center items-center w-full h-screen gap-3'>
                <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
                <p>{t("expiredOrWrongGuestInvitation")}</p>
            </div>

        )
    }

}