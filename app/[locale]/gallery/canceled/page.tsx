import CanceledVipList from '@/components/Vip/CanceledVipList';
import VipList from '@/components/Vip/VipList';
import { decrypt, encrypt } from '@/lib/cryption';
import { Gallery, Vip } from '@/types/collections';
import supabaseClient from "@/utils/supabase/supabaseClient"
import {  MoveLeft } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

    console.log("galleryId :", galleryId)

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

    const cancelledVipList = async () => {
        try {
            const res = await fetch('https://kiafvip.kiaf.org/api/gallery/vip_cancellist', vipListRequestOptions)
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
    const canceledVipListData = await cancelledVipList();




    const galleryListData = await galleryList();



    const getGalleryById = (post_id: string): Gallery | undefined => {
        return galleryListData.find((row: { post_id: string; }) => row.post_id === post_id);
    }

    const gallery = getGalleryById(galleryId);



    if (authData.status == true) {
        return (

            <div className="flex min-h-screen flex-col p-4 space-y-4">

                <div className="flex items-center gap-2 ">
                    <Button variant={"outline"} size={"icon"} asChild>
                        <Link href={`/gallery?g=${encrypt(galleryId)}`}>
                            <MoveLeft />
                        </Link>
                    </Button>
                    <h2 className="heading-2 ">Cancelled VIPs</h2>
                </div>

                

                <CanceledVipList canceledVips={canceledVipListData} itemsPerPage={10} listType={"gallery"}  />

            </div>
        )
    } else {
        return (
            <div>Wrong ID is provided</div>
        )
    }


}