import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import RsvpList from "@/components/Rsvp/RsvpList"
import { Rsvp, TimeSlot } from "@/types/collections";


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

const vipProgramList = async () => {
    try {

        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_program_list", requestOptions);
        const data = await res.json();

        return (data)

    } catch (err) {

        console.log(err);
        return (err)

    }
};

const timeSlotList = async () => {
    try {

        const res = await fetch("https://kiafvip.kiaf.org/api/admin/timeslot_list", requestOptions);
        const data = await res.json();

        return (data)


    } catch (err) {
        console.log(err);
        return (err)
    }
}

const accessibleRoles = ["master", "admin"];

export default async function Page() {

    const user = await checkUserAccount();
    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }



    const vipProgramListData = await vipProgramList();
    const timeSlotData = await timeSlotList();

    // merge timeSlotData into vipProgramListData by matching program_id with post_id
    const mergedVipProgramListData = vipProgramListData.map((program: Rsvp) => {
        const matchedTimeSlots = timeSlotData.filter(
            (slot: TimeSlot) => slot.program_id === program.post_id
        );
        return {
            ...program,
            timeSlots: matchedTimeSlots,
        };
    });



    return (
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">RSVP</h1>

                    <RsvpList rsvps={mergedVipProgramListData} itemsPerPage={10} />

                </div>
            </div>

        </div>
    )
}