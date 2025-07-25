"use client"

import { AdminVipInviteLogInsert, DateLimitedVipInvitationInsert } from "@/types/collections";
import { createClient } from "./client";

export async function setVipDateLimited(code: string, date: string): Promise<void> {

    const insertData: DateLimitedVipInvitationInsert = {
        date: date,
        code: code
    }



    const supabase = await createClient();


    const { error } = await supabase
        .from('dateLimitedVipInvitation')
        .insert(insertData)

    if (error) {
        console.error("Error during insert dateLimitedVipInvitation", error)
        throw error;
    }


}


export async function setAdminVipIviteLog(code: string, accout: string): Promise<void> {
    const insertData: AdminVipInviteLogInsert = {
        account: accout,
        code: code
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from('adminVipInviteLog')
        .insert(insertData)

    if (error) {
        console.error("Error during insert adminVipInviteLog", error)
        throw error;
    }

}


export async function deleteVipDateLimited(code: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('dateLimitedVipInvitation')
        .delete()
        .eq('code', code);

    if (error) {
        console.error("Error during delete dateLimitedVipInvitation", error);
        throw error;
    }
}