import { checkUserAccount } from "@/utils/supabase/auth_actions";
import Aside from "@/components/General/Aside/Aside";

import VipList from "@/components/Vip/VipList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { DateLimitedVipInvitation, Vip } from "@/types/collections";
import { MoveLeft, MoveLeftIcon } from "lucide-react";
import BulkInvite from "@/components/Vip/BulkInvite";


const accessibleRoles = ["master"];


export default async function Page() {

    const user = await checkUserAccount();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }


    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>


            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full space-y-4"  >
                    <div className="flex items-center gap-2">
                        <Button variant={"outline"} size={"icon"} asChild>
                            <Link href={"/admin/vip"}>
                                <MoveLeft />
                            </Link>
                        </Button>
                        <h2 className="heading-2 ">Bulk Invite VIPs</h2>

                        
                    </div>

                    <BulkInvite/>
                </div>

            </div>
        </div>
    )

}