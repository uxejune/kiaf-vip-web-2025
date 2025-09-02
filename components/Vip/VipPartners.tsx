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
        let frameId: number;

        const animation = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }

            // Null-safe GSAP updates
            if (firstLogoGroup.current) gsap.set(firstLogoGroup.current, { xPercent });
            if (secondLogoGroup.current) gsap.set(secondLogoGroup.current, { xPercent });
            if (thirdLogoGroup.current) gsap.set(thirdLogoGroup.current, { xPercent });

            xPercent += 0.05 * direction;
            frameId = requestAnimationFrame(animation);
        };

        frameId = requestAnimationFrame(animation);

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="flex overflow-hidden">
            <div ref={firstLogoGroup} className="shrink-0 flex gap-6 px-3">
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_03_02.png" width={36} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_03_02.png" width={36} height={36}/>
            </div>
            <div ref={secondLogoGroup} className="shrink-0 flex gap-6 px-3">
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_03_02.png" width={36} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_03_02.png" width={36} height={36}/>
            </div>
            <div ref={thirdLogoGroup} className="shrink-0 flex gap-6 px-3">
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_03_02.png" width={36} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_01.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_02.png" width={99} height={36}/>
                <PartnerLogo partnerName="KB Financial Group" imageUrl="/imgs/partner_logo_03_02.png" width={36} height={36}/>
            </div>
        </div>
    )
}