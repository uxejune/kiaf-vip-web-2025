
import { checkUserAccount } from "@/utils/supabase/auth_actions";
import Aside from "@/components/General/Aside/Aside";

import VipList from "@/components/Vip/VipList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { AdminVipInviteLog, DateLimitedVipInvitation, Vip } from "@/types/collections";

//fetching VIP list

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("type", "gallery");

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

const vipList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_list", requestOptions);
        const data = await res.json();


        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
};


const accessibleRoles = ["master", "admin", "guestDev", "agent"];

export default async function Page() {
    const user = await checkUserAccount();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    const vipListData: Vip[] = await vipList();
    const selectedVip: string[] = [];


    //fetching date limited VIP invitation list

    const supabase = await createClient();

    const { data: dateLimitedVipInvitation, error: errorDateLimitedVipInvitation } = await supabase
        .from("dateLimitedVipInvitation")
        .select("*");


    const { data: adminVipInviteLog, error: errorAdminVipInviteLog } = await supabase
        .from("adminVipInviteLog")
        .select("*");


    const dateLimitedVipInvitationData: DateLimitedVipInvitation[] = dateLimitedVipInvitation ?? [];

    const adminVipInviteLogData: AdminVipInviteLog[] = adminVipInviteLog ?? []

    // merge dateLimited info into vipListData by matching barcode with code
    vipListData.forEach(vip => {
        const match = dateLimitedVipInvitationData.find(item => item.code === vip.invitation_code);
        if (match) {
            (vip as Vip).date_limit = match.date;
            (vip as Vip).is_one_day_ticket = match.is_one_day_ticket;
        }
    });

    // merge admin invite log info into vipListData by matching barcode with code
    vipListData.forEach(vip => {
        const logMatch = adminVipInviteLogData.find(log => log.code === vip.invitation_code);
        if (logMatch) {
            (vip as Vip).invited_by = logMatch.account;
        }
    });


    console.log('vipListData :', vipListData);

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>


            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">

                    <h1 className="heading-1 pb-4">VIP</h1>
                    <div className="flex gap-4">
                        <Card className="w-40 mb-4 ">

                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Invited
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {vipListData.length}
                            </CardContent>
                        </Card>
                        <Button asChild>
                            <Link href={"/admin/vip/canceled"}>Canceled VIPs</Link>
                        </Button>

                        {user.role === "master" &&
                            <Button asChild variant={"outline"}>
                                <Link href={"/admin/vip/bulk_invite"}>Bulk Invite VIPs</Link>
                            </Button>
                        }


                    </div>

                    <VipList vips={vipListData} listType='gallery' itemsPerPage={10} isAdmin userEmail={user.email} />

                </div>
            </div>
        </div>
    );
}
