"use client"

import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";


interface Props {
    invitationCode:string;
}

const handleWebTicketClick = (invitation_code: string) => {


    window.open(`../vipticket?u=${invitation_code}`, '_blank');
};

export default function VipTicketAccessInfo({invitationCode}:Props){

    const ticketUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/vipticket?u=${invitationCode}`

    return (
        <div className="flex flex-col justify-center gap-4">
            <QRCode value={ticketUrl} />
            <Button size={"sm"} variant={"outline"} onClick={() => handleWebTicketClick(invitationCode)}>Web Ticket</Button>
        </div>
    )
}