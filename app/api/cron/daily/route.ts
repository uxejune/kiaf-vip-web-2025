import { DateLimitedVipInvitation } from '@/types/collections';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {


    console.log("hey");

    /* Cancel VIP */

    // get today date
    const today = new Date().toISOString().split('T')[0];
    console.log("today:", today);

    // fetching dateLimitedVipInvitation with date

    const testDay = "2025-09-03";

    const supabase = await createClient();

    const { data: dateLimitedVipInvitation, error: errorDateLimitedVipInvitation } = await supabase
        .from("dateLimitedVipInvitation")
        .select("*")
        .eq("date",testDay );

    const dateLimitedVipInvitationData: DateLimitedVipInvitation[] = dateLimitedVipInvitation ?? [];

    console.log("dateLimitedVipInvitationData :",dateLimitedVipInvitationData );

    // Execute action for each invitation
    for (const invitation of dateLimitedVipInvitationData) {
      // TODO: replace with the actual API call or business logic
      console.log(`Processing invitation code: ${invitation.code}`);
    }

    // cancel vip

    


    const data = today;


    return new NextResponse(JSON.stringify(data), {
        status: 200
    })

}