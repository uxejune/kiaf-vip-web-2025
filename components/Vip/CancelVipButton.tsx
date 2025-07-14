"use client"
import { Button } from "@/components/ui/button"
import { Vip } from "@/types/collections"
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

import { cancelVip, GalleryVipCancel } from "@/lib/api"
import { deleteVipDateLimited } from "@/utils/supabase/clientActions";
import { UserTypes } from "@/types/collections";
import { Trophy } from "lucide-react"

interface Props {
    userType?: UserTypes;
    selectedVips: Vip[];
    galleryId?: string;
}



export default function CancelVipButton({ userType = "admin", selectedVips, galleryId }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);

    async function onCancel() {


        setIsProcessing(true); // Set processing state to true

        if (userType == "admin") {
            //run admin cancel
            try {
                // Iterate through selectedVips and cancel each one
                await Promise.all(selectedVips.map(async (vip) => {
                    await cancelVip(vip.id); // Cancel the VIP

                    if (vip.date_limit != null) {
                        await deleteVipDateLimited(vip.barcode); // Also delete limited date info
                    }


                }));

                // deleteVipDateLimited


                setIsProcessing(false); // Reset processing state on success
                window.location.reload();
                // Optionally, you can add success handling or notifications here
            } catch (error) {
                console.error('Error cancelling VIPs:', error);
                setIsProcessing(false); // Reset processing state on error
                // Handle error states or notifications here
            }

        } else if (userType = "gallery") {
            if (galleryId) {
                //run gallery cancel

                try {
                    await Promise.all(selectedVips.map(async (vip) => {
                        await GalleryVipCancel(vip.id, galleryId)
                    }));

                    setIsProcessing(false); // Reset processing state on success
                    window.location.reload();

                } catch (error) {
                    console.error('Error cancelling VIPs:', error);
                    setIsProcessing(false); // Reset processing state on error
                    // Handle error states or notifications here
                }



            }



        }


    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button disabled={selectedVips.length === 0 || isProcessing === true} variant="destructive">Cancel</Button>
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