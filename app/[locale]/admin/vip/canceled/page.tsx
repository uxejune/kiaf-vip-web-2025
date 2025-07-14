import Aside from "@/components/General/Aside/Aside";
import { Button } from "@/components/ui/button";
import CanceledVipList from "@/components/Vip/CanceledVipList";
import VipList from "@/components/Vip/VipList";
import { checkUserAccount } from "@/utils/supabase/auth_actions";
import { MoveLeft, MoveLeftIcon } from "lucide-react";
import Link from "next/link";


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

const cancelledVipList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_cancellist", requestOptions);
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

    const canceledVipListData = await cancelledVipList();

    console.log("canceledVipListData",canceledVipListData);

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
                        <h2 className="heading-2 ">Cancelled VIPs</h2>
                    </div>

                    <CanceledVipList canceledVips={canceledVipListData} itemsPerPage={10} listType={"gallery"} isAdmin />
                </div>



            </div>
        </div>
    )
}