import VipList from '@/components/Vip/VipList';
import { decrypt, decrypt2nd, encrypt } from '@/lib/cryption';
import { Gallery, Quota, Vip } from '@/types/collections';
import supabaseClient from "@/utils/supabase/supabaseClient"
import { Button } from "@/components/ui/button";
import Link from "next/link";



interface PageProps {
    searchParams: {
        g: string;
    }
}



export default async function Page({ searchParams }: { searchParams: Promise<{ g?: string }>; }) {

    const { g } = await searchParams;

    if (!g) {
        return (
            <p>undefined code.</p>
        )
    }
    const galleryId = decrypt(g);

    // const galleryIdV2 = decrypt2nd(g);


    // console.log("gallery id:", galleryId)
    // console.log("gallery id v2:", galleryIdV2)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


    const urlencoded = new URLSearchParams();
    urlencoded.append("gallery", galleryId);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };

    const galleryAuth = async () => {
        try {
            const res = await fetch('https://kiafvip.kiaf.org/api/auth/galleryCheck', requestOptions)
            const data = await res.json()

            return (data)

        } catch (err) {
            console.log(err)
            return (err)
        }
    }

    const vipListBody = new URLSearchParams();
    vipListBody.append("gallery", galleryId);

    const vipListRequestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: vipListBody,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };

    const vipList = async () => {
        try {
            const res = await fetch('https://kiafvip.kiaf.org/api/gallery/vip_list', vipListRequestOptions)
            const data = await res.json()

            return (data)
        } catch (err) {
            console.log(err)
            return (err)
        }
    }

    const galleryList = async () => {
        try {
            const res = await fetch("https://kiafvip.kiaf.org/api/admin/gallery", requestOptions);
            const data = await res.json();



            return (data)

        } catch (err) {
            console.log(err);

            return (err)
        }
    };


    const authData = await galleryAuth();
    const vipListData: Vip[] = await vipList();


    const query = supabaseClient
        .from('vipQuota')
        .select('*', { count: 'exact' })
        .eq('id', galleryId)
        .single()

    const { data: quotaData, error: quotaDataError } = await query;

    const quotaValue: Quota | null = quotaData;

    const quota: number = quotaData ? quotaData.quota : 0;
    const singleQuota: number = quotaValue?.singleQuota ?? 0;

    const invitedVipCount: number = vipListData.filter((vip) => vip.vip_tier === "1").length;
    const invitedSingleVipCount: number = vipListData.filter((vip) => vip.vip_tier === "2").length;

    const isInviteAllowed: boolean = quota > invitedVipCount || singleQuota > invitedSingleVipCount;
    const galleryListData = await galleryList();



    const getGalleryById = (post_id: string): Gallery | undefined => {
        return galleryListData.find((row: { post_id: string; }) => row.post_id === post_id);
    }

    const gallery = getGalleryById(galleryId);



    if (authData.status == true) {
        return (

            <div className="flex min-h-screen flex-col">
                <div className="border-b py-3 px-4">
                    <h4>VIP Invitation Manager  | <span className='font-bold'>{gallery?.title}</span></h4>
                </div>



                <div className="p-4 w-full space-y-4">


                    <Button asChild>
                        <Link href={`/gallery/canceled?g=${encrypt(galleryId)}`}>Canceled VIPs</Link>
                    </Button>

                    {quotaData ? <p>
                        Normal Allocation: {quota} / Invited : {invitedVipCount} <br />
                        Single Allocation: {singleQuota} / Invited : {invitedSingleVipCount}
                    </p> : 'no allocation'}



                    <VipList
                        vips={vipListData}
                        listType='gallery'
                        itemsPerPage={10}
                        userType="gallery"
                        isInviteAllowed={isInviteAllowed}
                        galleryId={galleryId}

                        allocation={quota}
                        invited={invitedVipCount}
                        singleAllocation={singleQuota}
                        singleInvited={invitedSingleVipCount}
                    />
                </div>


            </div>
        )
    } else {
        return (
            <div>Wrong ID is provided</div>
        )
    }


}