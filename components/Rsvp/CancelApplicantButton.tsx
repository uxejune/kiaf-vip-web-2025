"use client"
import { Button } from "@/components/ui/button"
import { Applicant } from "@/types/collections";
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


interface Props {
    applicant: Applicant
}

export default function CancelApplicantButton({ applicant }: Props) {

    const [isProcessing, setIsProcessing] = useState(false);
    async function onCancel() {
        setIsProcessing(true);

        try {

            VipProgramApplicationCancel(applicant.id)

            setIsProcessing(false); // Reset processing state on success
            window.location.reload();


        } catch (error) {
            console.error('Error cancelling VIPs:', error);
            setIsProcessing(false); // Reset processing state on error
            // Handle error states or notifications here
        }

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size={"sm"}>Cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently cancel the VIP invitations.
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