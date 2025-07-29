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
import { DateLimitedVipInvitation, DayType, dayTypeKeys } from '@/types/collections';
import { headers } from 'next/headers';
import Link from 'next/link';
import AppOpenButton from '@/components/Vip/AppOpenButton';
import LocaleSwitch from '@/components/General/LocaleSwitch';
import { TicketPercent } from 'lucide-react';
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

    const isAppReleased = true;

    const { u } = await searchParams;
    const { locale } = await params;

    if (!u) {
        return (
            <p>undefined code.</p>
        )
    }

    const headersList = await headers();
    const userAgent = headersList.get('user-agent');
    const deviceType = getDeviceType(userAgent || '');

    const t = await getTranslations('VipTicket');
    const tForm = await getTranslations('GuestInviteForm');

    const encodedParameter = encodeURIComponent(u.toString());

    const ticketData = await vipTicketDetail(encodedParameter);

    if (!ticketData || !ticketData.status) {
        return (
            <div className='flex flex-col gap-3 justify-center items-center w-full h-screen'>
                <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
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
    // const isGuestAllowed = ticketData.guest_accept_datetime == null || hasPassedNextMidnight;
    const isGuestAllowed = true;

    const today: DayType = dateChecker();

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

    console.log(today);


    const friezeEntryInfo = today === "day1" ? t("friezeEntryInfo") : null;

    const mobileAppDownloadLink = {
        ios: "https://apps.apple.com/app/kiaf-vip/id6504750049",
        aos: "https://play.google.com/store/apps/details?id=org.kiaf.kiafvip",
    };





    // console.log('decrypted code:', decryptedInvitationCode);


    //check date limit
    const supabase = await createClient();

    const { data: dateLimitedVipInvitation, error: errorDateLimitedVipInvitation } = await supabase
        .from("dateLimitedVipInvitation")
        .select("*")
        .eq("code", decryptedInvitationCode)
        .single();

    const dateLimitedVipInvitationData: DateLimitedVipInvitation | null = dateLimitedVipInvitation ?? null;

    // console.log(dateLimitedVipInvitationData);

    return (

        <div className='flex sm:py-12 justify-center w-full max-sm:bg-black'>

            <div className="bg-neutral-100 py-7 w-full max-w-[640px] sm:rounded-md flex flex-col gap-6"
                style={{
                    backgroundImage: "url('/imgs/vip_ticket_bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className='px-7 flex justify-end text-black '>
                    <LocaleSwitch locale={locale} />
                </div>

                <VipTicket
                    qrCode={ticketData.qr_code}
                    entryInfo={entryInfo()}
                    locationInfo={t("locationInfo")}
                    friezeEntryInfo={friezeEntryInfo}
                    ticketType="vip"
                    warningInfo={t("warningInfo")}
                />

                {dateLimitedVipInvitationData && <p className='text-center'><span className='font-bold'>{dateLimitedVipInvitationData.date}</span><br /> {t("1dayTicketMessage")}</p>}

                {/* <VipPartners /> */}

                <div className='px-7 w-full'>
                    <div className='border bg-background shadow rounded-3xl p-5 flex flex-col gap-4'>

                        {ticketData.vip_tier === "1" &&
                            <>

                                <div className='flex items-center gap-4 max-[420px]:flex-col max-[420px]:items-start'>
                                    <div className='grow'>
                                        <h4 className=' heading-4'>Guest</h4>
                                        {isGuestInvited ? <p className=''>{ticketData.guest_mobile ? ticketData.guest_mobile : ticketData.guest_email}</p> : null}
                                        <p className=''>{t("guestInvitationMessage")}</p>
                                    </div>

                                    {isGuestAllowed ? (
                                        <GuestInviteButton
                                            invitationCode={decryptedInvitationCode}
                                            formTitle={tForm("formTitle")}
                                            formDescription={tForm("formDescribtion")}
                                            guestInvitationTypeLable={tForm("guestInvitationTypeLable")}
                                            phoneLabel={tForm("phone")}
                                            phoneValidationMessage={tForm("phoneValidationMessage")}
                                            emailLabel={tForm("email")}
                                            emailValidationMessage={tForm("emailValidationMessage")}
                                            phoneDescription={tForm("phoneDescription")}
                                            emailDescription={tForm("emailDescription")}
                                            validationMessage={tForm("validationMessage")}
                                            submitButton={tForm("submitButton")}
                                        />
                                    ) : null

                                    }


                                </div>
                                <hr className='border-neutral-200' />
                            </>
                        }



                        {isAppReleased ?

                            <>



                                <div className='flex items-center gap-4 max-[420px]:flex-col max-[420px]:items-start'>
                                    <div className='grow'>
                                        <h4 className=' heading-4'>Kiaf VIP App</h4>
                                        <p className=' break-keep'>{t("appIntroText")}</p>

                                    </div>


                                    {deviceType === 'ios' && (
                                        <div className='shrink-0 w-[10rem] flex flex-col gap-4'>
                                            {/* ios app download button */}
                                            <Button asChild variant={"outline"} className=' w-[10rem] shrink-0'>
                                                <Link target='_blank' href={`${mobileAppDownloadLink.ios}`}>Download App</Link>
                                            </Button>
                                            <Button asChild variant={"outline"} className=' w-[10rem] shrink-0'>
                                                <Link target='_blank' href={`${ticketData.ios}`}>Run App</Link>
                                            </Button>

                                        </div>
                                    )}

                                    {deviceType === 'android' && (
                                        <div className='shrink-0 w-[10rem] flex flex-col gap-4'>
                                            <Button asChild variant={"outline"} className=' w-[10rem] shrink-0'>
                                                <Link target='_blank' href={`${mobileAppDownloadLink.aos}`}>Download App</Link>
                                            </Button>
                                            <Button asChild variant={"outline"} className=' w-[10rem] shrink-0'>
                                                <Link target='_blank' href={`${ticketData.aos}`}>Run App</Link>
                                            </Button>
                                        </div>

                                    )}



                                    {deviceType === 'others' && (
                                        <div className='shrink-0 w-[10rem] flex flex-col gap-4'>
                                            <Button asChild variant={"outline"} className=' w-[10rem] shrink-0'>
                                                <Link target='_blank' href={`../vipticket/appredirect?a=${encodeURIComponent(ticketData.ios)}&s=${encodeURIComponent(mobileAppDownloadLink.ios)}`}>iOS App</Link>
                                            </Button>
                                            <Button asChild variant={"outline"} className='0 w-[10rem] shrink-0'>
                                                <Link target='_blank' href={`../vipticket/googleappredirect?a=${encodeURIComponent(ticketData.aos)}&s=${encodeURIComponent(mobileAppDownloadLink.aos)}`}>Android App</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>

                            </>

                            :
                            null}


                    </div>
                </div>
                <div className=" text-center w-full">
                    <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
                </div>
            </div>
        </div>


    );
}
