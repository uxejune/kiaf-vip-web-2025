import { redirect } from 'next/navigation'
import { checkUserAccount, logout } from '@/utils/supabase/auth_actions'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '@/components/General/Sidebar'
import DateEditButton from '@/components/Setting/DateEditButton';
import Aside from '@/components/General/Aside/Aside';
import { Banner } from '@/types/collections';
import { Button } from '@/components/ui/button';
import BannersList from '@/components/Banners/BannersList';
import BannersListEditButton from '@/components/Banners/BannersListEditButton';


export default async function Page() {

    const supabase = await createClient();

    //check page permission

    const accessibleRoles = ["master", "admin"];

    const user = await checkUserAccount();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    //fetching setting data

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };

    const setting = async () => {
        try {
            const res = await fetch("https://kiafvip.kiaf.org/api/admin/schedule_list", requestOptions);
            const data = await res.json();
            return (data)

        } catch (err) {
            console.log(err);
            return (err)
        }
    };

    const settingData = await setting();
    // console.log('setting data:', settingData);

    const topBanners: Banner[] = [];

    // const bottomBanners: Banner[] = [
    //     {
    //         "id": "6",
    //         "banner_type": "bottom",
    //         "image_url": "https://static-edge.kiaf.org/banner/banner_20250729_032825_455_68883fd96f456.png",
    //         "link": "https://kiaf.artspoon.io/en?utm_source=kiaf",
    //         "sort_order": "1"
    //     },
    //     {
    //         "id": "7",
    //         "banner_type": "bottom",
    //         "image_url": "https://static-edge.kiaf.org/banner/banner_20250729_032838_667_68883fe6a2de2.png",
    //         "link": "https://kiaf.artspoon.io/en?utm_source=kiaf",
    //         "sort_order": "2"
    //     }
    // ];



    const topBannerUrlencoded = new URLSearchParams();

    topBannerUrlencoded.append("type", "top");

    const topBannerRequestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: topBannerUrlencoded,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };

    const tomBanners = async () => {

        try {
            const res = await fetch("https://kiafvip.kiaf.org/api/admin/banner_list", topBannerRequestOptions);
            const data = await res.json();
            return (data)

        } catch (err) {
            console.log(err);
            return (err)
        }

    };


    // Fetch top banners data
    const topBannersData: Banner[] = await tomBanners();


    const bottomBannerUrlencoded = new URLSearchParams();

    bottomBannerUrlencoded.append("type", "bottom");

    const bottomBannerRequestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: bottomBannerUrlencoded,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };

    const bottomBanners = async () => {

        try {
            const res = await fetch("https://kiafvip.kiaf.org/api/admin/banner_list", bottomBannerRequestOptions);
            const data = await res.json();
            return (data)

        } catch (err) {
            console.log(err);
            return (err)
        }

    }

    // Fetch bottom banners data
    const bottomBannersData: Banner[] = await bottomBanners();

    // console.log("bottomBannersData",bottomBannersData);

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>

            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />

                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">Setting</h1>
                    <div className=''>
                        {Array.isArray(settingData) && settingData.find((item) => item.id === '1') ? (
                            <div className="mt-4 p-4 border rounded space-y-4">
                                <h2 className="text-lg font-bold">Art Fair Date</h2>
                                <div className="flex gap-4 items-center">
                                    <p>
                                        {(() => {
                                            const eventItem = settingData.find((item) => item.id === '1' && item.type === 'event');
                                            if (eventItem) {
                                                const startDate = new Date(eventItem.start_date);
                                                const endDate = new Date(eventItem.end_date);
                                                const format = (d: Date) => `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
                                                return `${format(startDate)} - ${format(endDate)}`;
                                            }
                                            return '행사 정보가 없습니다.';
                                        })()}
                                    </p>
                                    {(() => {
                                        const eventItem = settingData.find((item) => item.id === '1' && item.type === 'event');
                                        return (


                                            <DateEditButton
                                                type={"fair"}
                                                startDate={eventItem ? eventItem.start_date : undefined}
                                                endDate={eventItem ? eventItem.end_date : undefined}
                                            />
                                        );
                                    })()}
                                </div>

                            </div>
                        ) : (
                            <p className="mt-4">Art Fair date data could not be retrieved.</p>
                        )}

                        {Array.isArray(settingData) && settingData.find((item) => item.id === '2') ? (
                            <div className="mt-4 p-4 border rounded space-y-4">
                                <h2 className="text-lg font-bold">Viewing Room Date</h2>
                                <div className="flex gap-4 items-center">
                                    <p>
                                        {(() => {
                                            const eventItem = settingData.find((item) => item.id === '2' && item.type === 'vroom');
                                            if (eventItem) {
                                                const startDate = new Date(eventItem.start_date);
                                                const endDate = new Date(eventItem.end_date);
                                                const format = (d: Date) => `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
                                                return `${format(startDate)} - ${format(endDate)}`;
                                            }
                                            return '행사 정보가 없습니다.';
                                        })()}
                                    </p>
                                    {(() => {
                                        const eventItem = settingData.find((item) => item.id === '2' && item.type === 'vroom');
                                        return (

                                            <DateEditButton
                                                type={"viewingRoom"}
                                                startDate={eventItem ? eventItem.start_date : undefined}
                                                endDate={eventItem ? eventItem.end_date : undefined}
                                            />
                                        );
                                    })()}
                                </div>
                            </div>
                        ) : (
                            <p className="mt-4">Art Fair date data could not be retrieved.</p>
                        )}

                        <div className="mt-4 p-4 border rounded space-y-4">
                            <h2 className="text-lg font-bold">Banners</h2>

                            <div className='flex items-center gap-4'>
                                <h3 className="font-bold">Top</h3>
                                 <BannersListEditButton initialBanners={topBannersData} type={"top"} />
                            </div>

                            {topBannersData.length > 0 ? <BannersList banners={topBannersData} /> :
                                <p className='text-sm text-neutral-500'>
                                    There are no top banners set.
                                </p>}


                            <hr />

                            <div className='flex items-center gap-4'>
                                <h3 className="font-bold">Bottom</h3>
                                <BannersListEditButton initialBanners={bottomBannersData} type={"bottom"} />
                            </div>

                            {bottomBannersData.length > 0 ? <BannersList banners={bottomBannersData} /> :
                                <p className='text-sm text-neutral-500'>
                                    There are no bottom banners set.
                                </p>}

                        </div>

                    </div>

                </div>

            </div>


        </div>
    )
}