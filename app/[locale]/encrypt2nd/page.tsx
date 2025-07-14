import { encrypt2nd } from "@/lib/cryption";
import { encryptwhthoutURI } from "@/lib/cryption";

interface PageProps {

    searchParams: {
        u: string;
    }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ u?: string }>; }){

    const { u } = await searchParams;

    if (!u) {
        return(
            <p>undefined code.</p>
        )
    }

    const encryptWithoutURI = encryptwhthoutURI(u);
    const encryptedValue = encrypt2nd(u);

    return(
        <>
            <div>encrypt v2</div>
            <div>암호회 : {encryptWithoutURI} </div>
            <div>암호화 + URI: {encryptedValue}</div>
        </>
    )
}