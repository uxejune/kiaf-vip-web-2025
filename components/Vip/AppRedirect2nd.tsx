"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    deepLink: string;
    storeLink: string;
    storeMessage: string;
}

export default function AppRedirect2nd({ deepLink, storeLink,storeMessage }: Props) {

    const [isAppNotInstalled, setisAppNotInstalled] = useState(false);
    const [retirectCount, setRedirectCount] = useState(0);

    function checkInstallApp() {
        function clearTimers() {
            clearInterval(check);
            clearTimeout(timer);
        }

        function isHideWeb(): void {
            const doc = document as Document & {
                webkitHidden?: boolean;
            };

            if (doc.webkitHidden || document.hidden) {
                clearTimers();
            }
        }

        const check = setInterval(isHideWeb, 200);
        const timer = setTimeout(function () {
            redirectStore();
            clearTimers(); // Ensure timers are cleared after redirectStore is called
        }, 500);
    }

    const redirectStore = () => {
        // window.location.href = storeLink;

        setRedirectCount(retirectCount + 1)

        if (window.confirm(storeMessage)) {
            window.location.href = storeLink;
        }

    };

    function exeDeepLink() {
        window.location.href = deepLink;
    }

    useEffect(() => {
        exeDeepLink();
        checkInstallApp();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <Image src={"/imgs/kiaf_logo_black.png"} width={145} height={30} alt="Kiaf SEOUL" />
        </div>
    );
}
