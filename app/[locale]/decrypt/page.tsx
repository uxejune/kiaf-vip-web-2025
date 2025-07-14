import CryptoJS from 'crypto-js';
import { decrypt } from '@/lib/cryption';

interface PageProps {

    searchParams: {
        u: string;
    }
}


// function encrypt(text: string, secretKey: string): string {
//     return CryptoJS.AES.encrypt(text, secretKey).toString();
// }


export default async function Page({ searchParams }: { searchParams: Promise<{ u?: string }>; }) {
    const secretKey = 'your-secret-key';  // Replace with your actual secret key
    const { u } = await searchParams;

    if (!u) {
        return(
            <p>undefined code.</p>
        )
    }

    const decryptedId = decrypt(u);
    // const decrputedID2nd = decrypt2ND(searchParams.u,secretKey );

    // Generate the URL with the encrypted ID




    return (
        <div>{decryptedId}</div>
    )
}