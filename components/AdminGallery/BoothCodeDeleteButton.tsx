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
import { Trash } from "lucide-react";
import { createClient } from "@/utils/supabase/client";


interface Props {
    galleryId: string
}

export default function BoothCodeDeleteButton({galleryId}: Props){
    const [isProcessing, setIsProcessing] = useState(false);
    const supabase = createClient();

    async function onCancel() {
        setIsProcessing(true);

        const { data, error } = await supabase
            .from('galleryBoothCode')
            .delete()
            .eq('id', galleryId)

        if (error) {
            console.error("Error deleting data:", error);
            } else {


            //refresh the page
            window.location.reload();

        }

        setIsProcessing(false);

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"sm"} variant="destructive"> <Trash className="h-4 w-4" /></Button>
                
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the booth code.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onCancel}> {isProcessing ? 'Loading...' : 'Continue' } </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}