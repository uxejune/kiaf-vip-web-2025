import VipList from '@/components/Vip/VipList';
import { decrypt } from '@/lib/cryption';
import { Gallery } from '@/types/collections';
import supabaseClient from "@/utils/supabase/supabaseClient"


interface PageProps {
    searchParams: {
        g: string;
    }
}

const testGalleryId = "12345"


export default async function Page({ searchParams }: { searchParams: Promise<{ g?: string }>; }) {

    const { g } = await searchParams;

    if (!g) {
        return (
            <p>undefined code.</p>
        )
    }
    const galleryId = decrypt(g);


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
    const vipListData = await vipList();


    const query = supabaseClient
        .from('vipQuota')
        .select('*', { count: 'exact' })
        .eq('id', galleryId)
        .single()

    const { data: quotaData, error: quotaDataError } = await query;



    const quota: number = quotaData ? quotaData.quota : 0;
    const isInviteAllowed: boolean = quota > vipListData.length;
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



                <div className="p-4 w-full">
                    {quotaData ? <p>Allocation: {quota} / Invited : {vipListData.length}</p> : 'no allocation'}<br />

                    <VipList vips={vipListData} listType='gallery' itemsPerPage={10} userType="gallery" isInviteAllowed={isInviteAllowed} galleryId={galleryId} />
                </div>


            </div>
        )
    } else {
        return (
            <div>Wrong ID is provided</div>
        )
    }


}