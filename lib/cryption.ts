import CryptoJS from 'crypto-js';
import * as crypto from 'crypto';


const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

const seckretKey2nd = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY_2ND!);
const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY_IV!);

export function encrypt(text: string): string {
  //암호화 코드 v1
  // const encryptValue = CryptoJS.AES.encrypt(text, secretKey!).toString();
  // const encodedValue = encodeURIComponent(encryptValue)
  // return encodedValue
  //end of 암호화 코드 v1

  //암호화 코드 v2
  const encrypted = CryptoJS.AES.encrypt(text, seckretKey2nd, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const encodedValue = encodeURIComponent(encrypted.toString())

  return encodedValue;

}

export function decrypt(ciphertext: string): string {
  //복호화 코드 v1
  // const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey!);
  // const originalText = bytes.toString(CryptoJS.enc.Utf8);
  // return originalText;
  //end of 복호화 코드 v1
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
