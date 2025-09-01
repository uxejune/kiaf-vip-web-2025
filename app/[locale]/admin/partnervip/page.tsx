import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import VipList from "@/components/Vip/VipList";
import { createClient } from "@/utils/supabase/server";
import { AdminVipInviteLog, DateLimitedVipInvitation, Vip } from "@/types/collections";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("type", "partner");

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};


const partnerVipList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_list", requestOptions);
        const data = await res.json();
        

        
        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
};

const accessibleRoles = ["master","admin","agent"];

export default async function Page(){

    const user = await checkUserAccount();
    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible){
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    const partnerVipListData: Vip[] = await partnerVipList();


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
    partnerVipListData.forEach(vip => {
        const match = dateLimitedVipInvitationData.find(item => item.code === vip.invitation_code);
        if (match) {
            (vip as Vip).date_limit = match.date;
            (vip as Vip).is_one_day_ticket = match.is_one_day_ticket;
        }
    });

    // merge admin invite log info into vipListData by matching barcode with code
    partnerVipListData.forEach(vip => {
        const logMatch = adminVipInviteLogData.find(log => log.code === vip.invitation_code);
        if (logMatch) {
            (vip as Vip).invited_by = logMatch.account;
        }
    });

    console.log('vipListData :', partnerVipListData);

    return(
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!}/>
                <div className="p-4 w-full">
                    <h1 className="heading-1 mb-4">Partner VIP</h1>
                    {/* <VipList vips={data} itemsPerPage={10} /> */}
                    <VipList vips={partnerVipListData} listType='partner' itemsPerPage={10} isAdmin/>
                </div>
            </div>

        </div>
    )
}