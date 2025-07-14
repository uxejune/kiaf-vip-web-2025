"use client"
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

interface Props{
    deepLink:string;
    storeLink:string;
}

export default function AppOpenButton({deepLink,storeLink}: Props){
    const [isAppOpened, setIsAppOpened] = useState(false);

    const handleButtonCLick = () => {

        window.addEventListener('blur', () => {
            setIsAppOpened(true)
        })

        // window.location.href = deepLink;
        window.open(deepLink);

        // 일정 시간 후에 앱 스토어 링크로 리디렉션
        setTimeout(() => {
            if (isAppOpened ) {

                // setIsAppOpened(true);
            } else {
                window.location.href = storeLink;
            }
        }, 500);

    }

    return (
        <Button onClick={handleButtonCLick} variant={"outline"} className='border-0 w-[10rem] shrink-0'>MOBILE APP</Button>
    )

}