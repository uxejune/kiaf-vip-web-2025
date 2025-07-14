import { checkUserAccount } from "@/lib/account";
import Aside from "@/components/General/Aside/Aside";
import { revalidateTag } from 'next/cache'
import supabaseClient from "@/utils/supabase/supabaseClient"
import VipList from '@/components/Vip/VipList';

const accessibleRoles = ["master", "admin", "agent"];



const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect, // Explicitly cast to RequestRedirect
    next: { tags: ['collection'] }
};

const partnerList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/partners", requestOptions);
        const data = await res.json();
        return (data)
    } catch (err) {
        console.log(err);
        return (err)
    }
};

export default async function Page() {

    revalidateTag('collection');

    const partnerListData = await partnerList();



    const accountId = "30964";

    const query = supabaseClient
        .from('partnerVipQuota')
        .select('*', { count: 'exact' })
        .eq('id', accountId)
        .single()

    const { data: quotaData, error: quotaDataError } = await query;

    const isAllocated = quotaData != null && quotaData.quota > 0;


    const vipListBody = new URLSearchParams();
    vipListBody.append("partner_id", accountId);

    const vipListRequestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: vipListBody,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };


    const user = await checkUserAccount();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }


    const vipList = async () => {
        try {
            const res = await fetch('https://kiafvip.kiaf.org/api/partner/vip_list', vipListRequestOptions)
            const data = await res.json()


            return (data)
        } catch (err) {
            console.log(err)
            return (err)
        }

        
    }

    const vipListData = await vipList();
    const quota: number = quotaData ? quotaData.quota : 0;
    const isInviteAllowed: boolean = quota > vipListData.length;

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>


            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">VIP Desk</h1>
                    <p>{isAllocated ? `${vipListData.length} of ${quotaData!.quota} Invited` : 'no allocation'}</p>

                    <VipList vips={vipListData} listType='partner' itemsPerPage={10} userType='partner' isInviteAllowed={isInviteAllowed} partnerId={accountId} isAdmin={true} vipDesk={true} />

                </div>
            </div>
        </div>
    )
} 