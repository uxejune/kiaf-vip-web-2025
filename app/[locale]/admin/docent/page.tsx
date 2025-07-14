import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import ArtworkList from "@/components/Artwork/ArtworkList"
import supabaseClient from "@/utils/supabase/supabaseClient"
import { Artwork } from "@/types/collections";


const myHeaders = new Headers();

const urlencoded = new URLSearchParams();

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

const artworkList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/artwork_list",requestOptions);
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
}

const accessibleRoles = ["master","admin"];

export default async function Page(){

    const user = await checkUserAccount();
    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible){
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    const data = await artworkList();

    
    const boothCodeQuery = supabaseClient
        .from('galleryBoothCode')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });


    const { data : boothCodeData, error: boothCodeDataError, count: boothCodeDataCount } = await boothCodeQuery;

    if (boothCodeDataError) {
        console.error(boothCodeDataError);
        return <div>Error loading boothCode</div>;
    }

    const artworkNBoothCodeData:Artwork[] = data.map((artwork: { post_id: string; ovr_post_id: string;  }) => {
        const matchingBoothCode = boothCodeData!.find(boothCode => boothCode.id === artwork.ovr_post_id );
        return matchingBoothCode  ? { ...artwork, boothCode: matchingBoothCode?.code } : artwork;
    });


    return(
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">Docent</h1>
                    <ArtworkList artworks={artworkNBoothCodeData} itemsPerPage={6}  />
                </div>
            </div>

        </div>
    )
}