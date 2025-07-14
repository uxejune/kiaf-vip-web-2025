import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import ArtworkList from "@/components/Artwork/ArtworkList"
import supabaseClient from "@/utils/supabase/supabaseClient"
import DocentGenerateArtworkList from "@/components/Artwork/DocentGenerateArtworkList";
import { refineDesc } from "@/lib/utils";
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
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/artwork_list", requestOptions);
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
}

const accessibleRoles = ["master"];

export default async function Page() {

    const user = await checkUserAccount();
    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    const data = await artworkList();

    const artworks_with_desc = data.filter((item: Artwork) =>
        (item.desc_en !== null && item.desc_en.trim() !== '') ||
        (item.desc_ko !== null && item.desc_ko.trim() !== '')
    );

    const artworks_with_desc_en = data.filter((item: Artwork) =>
        item.desc_en !== null && item.desc_en.trim() !== ''
    );

    const artworks_with_desc_ko = data.filter((item: Artwork) =>
        item.desc_ko !== null && item.desc_ko.trim() !== ''
    );

    // console.log ("artworks",artworks_with_desc);

    const sorted_artworks_with_docent = artworks_with_desc.sort((a:Artwork, b:Artwork) => {
        // Check if both en_url and ko_url are null for both items
        const aHasUrl = a.en_url !== null || a.ko_url !== null;
        const bHasUrl = b.en_url !== null || b.ko_url !== null;
    
        // Sort items with URLs (not null) to the end
        if (aHasUrl && !bHasUrl) {
            return 1; // a should be after b
        } else if (!aHasUrl && bHasUrl) {
            return -1; // a should be before b
        } else {
            return 0; // keep original order if both have or don&#39;t have URLs
        }
    });


    const boothCodeQuery = supabaseClient
        .from('galleryBoothCode')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });


    const { data: boothCodeData, error: boothCodeDataError, count: boothCodeDataCount } = await boothCodeQuery;

    if (boothCodeDataError) {
        console.error(boothCodeDataError);
        return <div>Error loading boothCode</div>;
    }

    const artworkNBoothCodeData: Artwork[] = sorted_artworks_with_docent.map((artwork: { post_id: string; ovr_post_id: string; }) => {
        const matchingBoothCode = boothCodeData!.find(boothCode => boothCode.id === artwork.ovr_post_id);
        return matchingBoothCode ? { ...artwork, boothCode: matchingBoothCode?.code } : artwork;
    });



    return (
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">Docent</h1>
                    <p>with desc_en : {artworks_with_desc_en.length} / with desc_ko : {artworks_with_desc_ko.length}</p>

                    <DocentGenerateArtworkList artworks={artworkNBoothCodeData} itemsPerPage={20} />
                </div>
            </div>

        </div>
    )
}