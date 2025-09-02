import QRCode from "react-qr-code";
import { revalidateTag } from 'next/cache'
import { Button } from "@/components/ui/button";
import VipTicketAccessInfo from "@/components/Vip/VipTicketAccessInfo";
import { getTranslations } from 'next-intl/server';
import { decrypt, decrypt2nd } from "@/lib/cryption";
import GuestInviteButton from '@/components/Vip/GuestInviteButton';

interface PageProps {

    params: {
        locale: string;
    }
    searchParams: {
        u: string;
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

    // revalidateTag('collection'); //prevent Caching 

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

    const encodedParameter = encodeURIComponent(u.toString());
    const decryptedInvitationCode = decrypt(u.toString());

    const ticketDetail = await vipTicketDetail(encodedParameter);


    const ticketUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/vipticket?u=${u.toString()}`
    const tForm = await getTranslations('GuestInviteForm');




    return (
        <div className="w-full h-160 flex flex-col justify-center items-center gap-4 p-4">
            <VipTicketAccessInfo invitationCode={encodedParameter} />
            <div>
                <h3>게스트 초대 정보</h3>
                <ul>
                    {ticketDetail.guest_email ? <li>{ticketDetail.guest_email}</li> : null}
                    {ticketDetail.guest_mobile ? <li>{ticketDetail.guest_mobile}</li> : null}
                    {ticketDetail.guest_accept_datetime ? <li>{ticketDetail.guest_accept_datetime}</li> : null}

                </ul>
                <GuestInviteButton
                    invitationCode={decryptedInvitationCode}
                    encodedCode={encodedParameter}
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
                    guestChangeMessage={tForm("guestChangeMessage")}
                />
            </div>
        </div>
    );

}