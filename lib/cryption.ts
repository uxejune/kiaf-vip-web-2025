import CryptoJS from 'crypto-js';
import * as crypto from 'crypto';


const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

const seckretKey2nd = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY_2ND!);
const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY_IV!);

export function encrypt(text: string): string {

  const encrypted = CryptoJS.AES.encrypt(text, seckretKey2nd, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const encodedValue = encodeURIComponent(encrypted.toString())

  return encodedValue;

}

export function decrypt(ciphertext: string): string {

  const decrypted = CryptoJS.AES.decrypt(ciphertext, seckretKey2nd, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);

}




export function encryptwhthoutURI(text: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, seckretKey2nd, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

export function encrypt2nd(text: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, seckretKey2nd, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  const encodedValue = encodeURIComponent(encrypted.toString())

  return encodedValue;
}

export function decrypt2nd(ciphertext: string): string {
  const decoded = decodeURIComponent(ciphertext);
  const decrypted = CryptoJS.AES.decrypt(decoded, seckretKey2nd, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
