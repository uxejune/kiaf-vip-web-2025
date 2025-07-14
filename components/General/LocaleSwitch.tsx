
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
    locale: string,
    className?: string,
}


export default function LocaleSwitch({locale,className}:Props) {



    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()


    
    const searchParamsString = searchParams.toString();



    const basePath = pathname.replace(/^\/(en|ko)/, '');

    const hrefEn = `/en${basePath}?${searchParamsString}`;
    const hrefKo = `/ko${basePath}?${searchParamsString}`;



    

    return (


        <div>
            {locale == "ko" ? 
                <Link href={hrefEn} className={className}>ENG</Link> :
                <Link href={hrefKo} className={className}>한국어</Link>   
            }
        </div>
        
    )
}