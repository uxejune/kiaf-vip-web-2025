
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from "next/image";

interface Props {
    deepLink: string;
    storeLink: string;
}

export default function AppRedirect({deepLink,storeLink}:Props) {

    const [isAppOpened, setIsAppOpened] = useState(false);


    useEffect(() => {

        const now = Date.now();

        // 앱 딥 링크오픈
        window.location.href = deepLink;


        window.addEventListener('blur', () => {
            setIsAppOpened(true)
        })


        // 일정 시간 후에 앱 스토어 링크로 리디렉션
        setTimeout(() => {
            if (isAppOpened ) {
                // setIsAppOpened(true);
            } else {

                if (window.confirm("스토어로 이동하시겠습니까?")) {
                    window.location.href = storeLink;
                }

                // window.location.href = storeLink;
            }
        }, 1500);
        

    })

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <Image src={"/imgs/kiaf_logo_black.png"} width={145} height={30} alt="Kiaf SEOUL" />
        </div>
    )
}