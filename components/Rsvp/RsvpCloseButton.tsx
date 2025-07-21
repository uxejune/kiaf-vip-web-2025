"use client"

import { Rsvp } from "@/types/collections";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { VipProgramRsvpAllocation } from "@/lib/api";


interface Props {
    rsvp: Rsvp
}

export default function RsvpCloseBUtton({ rsvp }: Props) {

    const [isProcessing, setIsProcessing] = useState(false);
    async function onClose() {
        setIsProcessing(true)

        const capacity = rsvp.count;
        const allowCompanionValue = rsvp.companion === "1" ? 1 : 0;

        // Set RSVP capacity to match current applicant count



        try {

            const res = await fetch("/api/vip_program_rsvp_allocation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    program_id: rsvp.post_id, // Replace with actual id if needed
                    capacity: capacity,
                    companion: allowCompanionValue
                }),
            })

            if (!res.ok) {
                console.error("Failed to update allocation:", res.status);
                return;
            }

            const result = await res.json();
            // console.log("update reslt:", result);
            setIsProcessing(false);
            window.location.reload();

        } catch (err) {
            console.error("API error:", err);
            setIsProcessing(false);
        }



    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Close RSVP</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        RSVP 신청 인원수를 신청인수로 수정하여 추가 신청이 불가능해 집니다.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onClose}>Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}