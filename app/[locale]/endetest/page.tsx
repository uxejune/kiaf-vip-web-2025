import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1234AFCK9012WERT'); // 16 bytes key
const iv = CryptoJS.enc.Utf8.parse('VGWE5678KWER3456');  // 16 bytes IV

function encrypt(text: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function decrypt(ciphertext: string): string {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Usage example
const text = "Hello, World!";
const encryptedText = encrypt(text);
const decryptedText = decrypt(encryptedText);



export default async function Page(){
    return (
        <div>
            Excrypted: {encryptedText} <br/>
            Decrypted: {decryptedText}
            
        </div>
    )
}