import { checkUserAccount } from "@/lib/account";
import Aside from "@/components/General/Aside/Aside";
import supabaseClient from "@/utils/supabase/supabaseClient";
import CreatedIdList from "@/components/CreatedId/CreatedIdList";
import { CreatedId, DateLimitedVipInvitation, Partner, Vip } from "@/types/collections";
import { createClient } from "@/utils/supabase/server";

const accessibleRoles = ["master"];

export default async function Page() {

    const user = await checkUserAccount();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    //fetching Gallery VIP

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

    //fetching partner VIP

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

    //fetching day limited tickets

    const supabase = await createClient();

    const { data: dateLimitedVipInvitation, error: errorDateLimitedVipInvitation } = await supabase
        .from("dateLimitedVipInvitation")
        .select("*");
    const dateLimitedVipInvitationData: DateLimitedVipInvitation[] = dateLimitedVipInvitation ?? [];

    return (
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">Day Limited Tickets</h1>

                </div>
            </div>
        </div>
    )

}