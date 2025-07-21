import { decrypt } from '@/lib/cryption';
import { Partner } from '@/types/collections';
import Image from 'next/image';
import supabaseClient from "@/utils/supabase/supabaseClient"
import VipList from '@/components/Vip/VipList';
import { list } from 'postcss';
import { revalidateTag } from 'next/cache'

interface PageProps {
    searchParams: {
        p: string;
    }
}

const testPartnerId = "12345"

async function gallery_auth(galleryId: string) {
    if (galleryId == testPartnerId) {
        return {
            "status": true,
            "message": 200
        }
    } else {
        return {
            "status": false,
            "message": 401
        }
    }
}

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




export default async function Page({ searchParams }: { searchParams: Promise<{ p?: string }>; }) {
    // revalidateTag('collection');

    const { p } = await searchParams;

    if (!p) {
        return(
            <p>undefined code.</p>
        )
    }

    const partnerListData = await partnerList();



    const getPartnerById = (user_id: string): Partner | undefined => {
        return partnerListData.find((row: { user_id: string; }) => row.user_id === user_id);
    }



    const decryptedId = decrypt(p);



    const partner = getPartnerById(decryptedId)



    const query = supabaseClient
        .from('partnerVipQuota')
        .select('*', { count: 'exact' })
        .eq('id', partner!.user_id)
        .single()

    const { data: quotaData, error: quotaDataError } = await query;


    const isAllocated = quotaData != null && quotaData.quota > 0;



    const vipListBody = new URLSearchParams();
    vipListBody.append("partner_id", decryptedId);

    const vipListRequestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: vipListBody,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };


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


    if (partner) {
        return (

            <div className="flex min-h-screen flex-col">
                <div className="border-b py-3 px-4">
                    <h4>VIP Invitation Manager | <span className='font-bold'>{partner.nickname}</span></h4>
                </div>
                <div className="p-4 w-full">

                    <p>{isAllocated ? `${vipListData.length} of ${quotaData!.quota} Invited` : 'no allocation'}</p>

                    <p>{isAllocated ? `Single ${vipListData.length} of ${quotaData!.singleQuota} Invited` : 'no allocation'}</p>
                    

                    {isAllocated ?

                        <VipList vips={vipListData} listType='partner' itemsPerPage={10} userType='partner' isInviteAllowed={isInviteAllowed} partnerId={decryptedId} isAdmin={partner.nickname == "artifactstest08" } />

                    : null}
                </div>
            </div>

        )
    } else {
        return (
            <div>Wrong ID is provided</div>
        )
    }


}