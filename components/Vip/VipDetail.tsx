"use client"

import { Vip, VipListTypes } from "@/types/collections"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { encrypt } from "@/lib/cryption";
import GuestInviteButton from "./GuestInviteButton";
import GuestOverrideButton from "./GuestOverrideButton";


interface Props {
    vip: Vip,
    isAdmin?: boolean
    listType: VipListTypes;
}



export default function VipDetail({ vip, isAdmin = false, listType }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const encryptedCode = encrypt(vip.invitation_code);

    const handleTicketAccessClick = () => {


        window.open(`../vipticket/information?u=${encryptedCode}`, '_blank');
    };

    async function onResend() {
        setIsLoading(true);
        try {
            const res = await fetch("/api/vip_invite_resend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: vip.id,
                }),
            });

            if (!res.ok) {
                console.error("Failed to add timeslot:", res.status);
                return;
            }

            const result = await res.json();

            toast("Invitation has been sent again.");
            console.log("sent");
        } catch (err) {
            console.error("API error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild><Button variant={"outline"} size={"sm"}>Detail</Button></SheetTrigger>
            <SheetContent className="w-[860px]">
                <SheetHeader>
                    <Badge>
                        {vip.vip_tier === "1" ? "Normal" : "Single"}
                    </Badge>
                    <SheetTitle>{vip.email}</SheetTitle>


                </SheetHeader>

                <div className="flex flex-col p-4 space-y-8">

                    <div className="flex gap-2">
                        <Button disabled={listType == "partner"} variant={"outline"} onClick={onResend} >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Resend Invitation"}
                        </Button>

                        {isAdmin &&
                            <Button variant={"outline"} onClick={() => handleTicketAccessClick()}>
                                Open Ticket
                            </Button>
                        }


                    </div>



                    {vip.mobile &&
                        <div>
                            <h3 className="font-bold">Phone</h3>
                            <Badge variant={"outline"}>{vip.mobile}</Badge>
                        </div>
                    }

                    {isAdmin &&
                        <>
                            <div>
                                <h3 className="font-bold">Enter date</h3>
                                {vip.enter_date ? <Badge variant={"secondary"}>{vip.enter_date}</Badge> : <Badge>None</Badge>}
                            </div>


                            <div className="space-y-4">
                                <h3 className="font-bold">Guest</h3>
                                {vip.guest_email || vip.guest_mobile ?
                                    <div >

                                        <div className="flex gap-1">
                                            <Badge variant={"outline"}>초대함</Badge>
                                            <Badge variant={"secondary"}>{vip.guest_email || vip.guest_mobile}</Badge>
                                        </div>

                                        {vip.guest_enter_status == "1" ?

                                            <div>
                                                <Badge variant={"outline"}>게스트 입장함</Badge>
                                                <p className="text-xs">{vip.guest_enter_date}</p>
                                            </div>

                                            : <div>
                                                <Badge variant={"outline"}>게스트 입장전</Badge>
                                            </div>

                                        }

                                    </div>
                                    : <Badge>None</Badge>}
                                <GuestOverrideButton invitationCode={vip.invitation_code} />
                            </div>

                            <div>
                                <h3 className="font-bold">Date Limit</h3>
                                {vip.date_limit ? <Badge variant={"secondary"}>{vip.date_limit}</Badge> : <Badge>None</Badge>}
                            </div>

                            <div>
                                <h3 className="font-bold">Invited by</h3>
                                {vip.invited_by ? <Badge variant={"secondary"}>{vip.invited_by}</Badge> :
                                    vip.gallery_title ? <Badge variant={"secondary"}>{vip.gallery_title}</Badge> :
                                        vip.partner_title ? <Badge variant={"secondary"}>{vip.partner_title}</Badge> :
                                            <Badge>None</Badge>}
                            </div>
                        </>
                    }



                </div>
            </SheetContent>
        </Sheet>
    )
}