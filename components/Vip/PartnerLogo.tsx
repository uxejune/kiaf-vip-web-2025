"use client"
import Image from "next/image"

interface Props {
    partnerName: string;
    imageUrl: string;
    width: number;
    height: number;
}

export default function PartnerLogo({ partnerName, imageUrl, width, height }: Props) {



    return (
        <div className=" h-[2.25rem] w-auto flex ">
            <Image
                alt={partnerName}
                src={imageUrl}
                width={width}
                height={height}

            />


        </div>
    )
}