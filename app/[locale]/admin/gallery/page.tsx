import { checkUserAccount } from "@/lib/account";
import Aside from "@/components/General/Aside/Aside";
import GalleryList from "@/components/AdminGallery/GalleryList";
import supabaseClient from "@/utils/supabase/supabaseClient"
import { Gallery } from "@/types/collections";


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

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

const accessibleRoles = ["master","admin"];

export default async function Page() {
    const user = await checkUserAccount();
    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible){
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }


    const galleryListData = await galleryList();

    const query = supabaseClient
        .from('vipQuota')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    const {  data : quotaData, error: quotaDataError, count } = await query;



    if (quotaDataError) {
        console.error(quotaDataError);
        return <div>Error loading quota</div>;
    }


    const boothCodeQuery = supabaseClient
        .from('galleryBoothCode')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });


    const { data : boothCodeData, error: boothCodeDataError, count: boothCodeDataCount } = await boothCodeQuery;

    if (boothCodeDataError) {
        console.error(boothCodeDataError);
        return <div>Error loading boothCode</div>;
    }




    const galleryNQuotaData:Gallery[] = galleryListData.map((gallery: { post_id: string; }) => {
        const matchingQuota = quotaData!.find(quota => quota.id === gallery.post_id);
        const matchingBoothCode = boothCodeData!.find(boothCode => boothCode.id === gallery.post_id );
        return matchingQuota || matchingBoothCode  ? { ...gallery, quota: matchingQuota?.quota, singleQuota: matchingQuota?.singleQuota , allocationDate: matchingQuota?.created_at, boothCode: matchingBoothCode?.code } : gallery;
    });




    const filteredGalleries:Gallery[] = galleryNQuotaData.filter(
        (  gallery: { payment?: string; }) => gallery.payment === 'selected' || gallery.payment === 'cond-selected'
    );
    




    galleryNQuotaData.sort((a:Gallery, b:Gallery) => {
        const dateA = new Date(a.allocationDate || '1970-01-01').getTime();
        const dateB = new Date(b.allocationDate || '1970-01-01').getTime();
        return dateB - dateA;
    });




    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!}/>
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">Gallery</h1>

                    <GalleryList galleries={filteredGalleries} itemsPerPage={10}/>

                </div>
            </div>
        </div>
    )
}