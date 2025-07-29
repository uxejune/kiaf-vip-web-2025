import { Banner as BannerType } from "@/types/collections"
import Banner from "./Banner"

interface Props {
    banners: BannerType[]
} 

export default function BannersList({banners}:Props) {
    return (
        <div className="space-y-2">
            { banners.map((banner) => (
                <Banner banner={banner} key={banner.id} />
            ))}
        </div>
    )
}