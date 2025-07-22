"use client"
import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import PartnerLogo from "./PartnerLogo";

export default function VipPartners() {

    const firstLogoGroup = useRef(null);
    const secondLogoGroup = useRef(null);
    const thirdLogoGroup = useRef(null);

    let xPercent = 0;
    const direction = -1;

    useEffect(() => {

        requestAnimationFrame(animation);

    },[])

    const animation = () => {
;
        if(xPercent <= -100){
            xPercent = 0;
        }

        gsap.set(firstLogoGroup.current,{xPercent: xPercent})
        gsap.set(secondLogoGroup.current,{xPercent: xPercent})
        gsap.set(thirdLogoGroup.current,{xPercent: xPercent})
        xPercent += 0.05 * direction;
        requestAnimationFrame(animation);
    }

    return (
        <div className="flex overflow-hidden">
            <div ref={firstLogoGroup} className="shrink-0 flex gap-6 px-3">
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
            </div>
            <div ref={secondLogoGroup} className="shrink-0 flex gap-6 px-3">
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
            </div>
            <div ref={thirdLogoGroup} className="shrink-0 flex gap-6 px-3">
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
            </div>
        </div>
    )
}