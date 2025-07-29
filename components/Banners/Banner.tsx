import { Banner as BannerType } from "@/types/collections"
import Image from "next/image"
import Link from "next/link"

interface Props {
    banner: BannerType
}

export default function Banner({ banner }: Props) {
    return (
        <div className="p-2 bg-neutral-100 border border-neutral-200 flex items-center gap-2">
            <p className="text-sm text-neutral-500">{banner.sort_order}</p>
            <div className="relative w-full aspect-[6/1] max-w-sm border border-neutral-100">
                <Image src={banner.image_url} fill className="object-cover" alt="banner-image" />
            </div>
            <div>
                <Link href={banner.link} className="hover:underline">
                    <p className="text-sm text-neutral-500">{banner.link}</p>
                </Link>
            </div>
        </div>
    )
}