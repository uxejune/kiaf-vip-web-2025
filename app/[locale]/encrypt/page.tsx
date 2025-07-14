import CryptoJS from 'crypto-js';
import { encrypt } from '@/lib/cryption';



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

    const encryptedId = encrypt(u);

    // Generate the URL with the encrypted ID


    return (
        <>
            <div>{encryptedId}</div>
        </>
    )
}