
import { checkUserAccount } from "@/utils/supabase/auth_actions";
import Aside from "@/components/General/Aside/Aside";

import VipList from "@/components/Vip/VipList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { AdminVipInviteLog, DateLimitedVipInvitation, Vip } from "@/types/collections";
import GuestList from "@/components/Vip/GuestList";

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

const partnerUrlencoded = new URLSearchParams();
partnerUrlencoded.append("type", "partner");

const partnerRequestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: partnerUrlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

const partnerVipList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_list", partnerRequestOptions);
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

    

        // Fetch VIP and Partner lists concurrently
    const [vipRaw, partnerRaw] = await Promise.all([vipList(), partnerVipList()]);

    
    const vipListData: Vip[] = [
        ...(Array.isArray(vipRaw) ? vipRaw : []),
        ...(Array.isArray(partnerRaw) ? partnerRaw : [])
    ].filter(vip => vip.guest_mobile || vip.guest_email);


    // console.log('vipListData :', vipListData);

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>


            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">

                    <h1 className="heading-1 pb-4">Guest</h1>
                    <div className="flex gap-4">
                        <Card className="w-40 mb-4 ">

                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Guests
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {vipListData.length}
                            </CardContent>
                        </Card>



                    </div>

                    <GuestList vips={vipListData} itemsPerPage={10} />

                    {/* <VipList vips={vipListData} listType='gallery' userType={user.role=="agent" ? "agent" : "admin" } itemsPerPage={10} isAdmin userEmail={user.email} /> */}

                </div>
            </div>
        </div>
    );
}
