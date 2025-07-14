import { decrypt2nd } from "@/lib/cryption";

interface PageProps {

    searchParams: {
        u: string;
    }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ u?: string }>; }) {

    const { u } = await searchParams;

    if (!u) {
        return (
            <p>undefined code.</p>
        )
    }

    const decryptedValue = decrypt2nd(u);


    return (
        <>
            <div>decrypt v2</div>
            <div>{decryptedValue}</div>
        </>
    )
}