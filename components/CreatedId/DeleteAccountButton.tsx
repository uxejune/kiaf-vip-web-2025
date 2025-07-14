'use client';
import { CreatedId, Partner } from "@/types/collections";
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

import { cancelVip, deleteAccount, GalleryVipCancel } from "@/lib/api"
import { UserTypes } from "@/types/collections";
import { createClient } from "@/utils/supabase/client";


interface Props {
    selectedAccounts: CreatedId[]; 
}

export default function DeleteAccountButton({selectedAccounts}:Props){

    const [isProcessing, setIsProcessing] = useState(false);
    const supabase = createClient();

    async function onCancel(){
        setIsProcessing(true);

        try {

            await Promise.all(selectedAccounts.map(async (account) => {
                // await cancelVip(account.user_id); // Assuming vip_id is the identifier for each vip

                //1.cancel VIP
                await cancelVip(account.vip_id!);

                //2.delete account

                await deleteAccount(account.id!);

                //3.delete from supabase
                const { data, error } = await supabase
                .from('createdAccount')
                .delete()
                .eq('id',account.id)
                
                if (error) {
                    console.error("Error inserting data:", error);
                } else {
                    //success to delete from supabase
                    
                }

            }));

            window.location.reload();

            // setIsProcessing(false);
        } catch (error) {
            console.error('Error cancelling VIPs:', error);
            setIsProcessing(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button disabled={selectedAccounts.length === 0 || isProcessing === true } variant="destructive">Delete</Button>
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