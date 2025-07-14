import { redirect } from 'next/navigation'
import { checkUserAccount, logout } from '@/utils/supabase/auth_actions'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '@/components/General/Sidebar'
import DateEditButton from '@/components/Setting/DateEditButton';
import Aside from '@/components/General/Aside/Aside';


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

                    </div>

                </div>

            </div>


        </div>
    )
}