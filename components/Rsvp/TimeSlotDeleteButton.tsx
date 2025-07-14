"use client"
import { Button } from "@/components/ui/button"
import { Applicant, Rsvp, TimeSlot } from "@/types/collections";
import { useState } from "react"
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
import { VipProgramApplicationCancel } from "@/lib/api";
import { Trash } from "lucide-react";


interface Props {
    timeSlot: TimeSlot
}

export default function TimeSlotDeleteButton({ timeSlot }: Props) {

    const [isLoading, setIsLoading] = useState(false);

    async function onCancel() {
        setIsLoading(true);

        try {
            const res = await fetch("/api/timeslot_delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: timeSlot.id
                }),
            });

            if (!res.ok) {
                console.error("Failed to add timeslot:", res.status);
                return;
            }

            const result = await res.json();
            // console.log("Timeslot added:", result);
            
        } catch (err) {
            console.error("API error:", err);
        } finally {
            setIsLoading(false);
            window.location.reload();
        }

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} variant="ghost"><Trash/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently cancel the time slot and applicants.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onCancel}>Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}