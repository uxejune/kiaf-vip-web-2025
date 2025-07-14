import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import supabaseClient from "@/utils/supabase/supabaseClient"
import CreatedIdList from "@/components/CreatedId/CreatedIdList";
import { CreatedId, Partner, Vip } from "@/types/collections";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
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

const partnerVipList = async () => {
    try {
        const res = await fetch('https://kiafvip.kiaf.org/api/partner/vip_list', requestOptions)
        const data = await res.json()


        return (data)
    } catch (err) {
        console.log(err)
        return (err)
    }
}

const accessibleRoles = ["master"];

export default async function Page() {
    const user = await checkUserAccount();
    const partnerListData = await partnerList();
    const partnerVipListData = await partnerVipList();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible){
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }



    const query = supabaseClient
        .from('createdAccount')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    const { data: accountData, error: accountDataError, count } = await query;



    if (accountDataError) {
        console.error(accountDataError);
        return;
    }

    let mergedData;

    if (accountData) {
        // Merging partner name into account data
        mergedData = accountData.map((account: CreatedId) => {
            const partner = partnerListData.find((partner: Partner) => partner.user_id === account.partner_id);
            const vip = partnerVipListData.find((vip: Vip) => vip.email === account.email);
            return {
                ...account,
                partner_name: partner ? partner.nickname : null,
                vip_id: vip ? vip.id : null
            };
        });

    } else {
        console.log('No account data available.');
    }

    return (
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!}/>
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">ID Created Partner VIP</h1>
                    {mergedData &&
                        <CreatedIdList createdIds={mergedData} itemsPerPage={10} />
                    }
                </div>
            </div>
        </div>
    )
}