import { DateLimitedVipInvitationInsert } from "@/types/collections";
import { createClient } from "./server";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



export async function updateDate(type: "fair" | "viewingRoom", startDate: Date, endDate: Date): Promise<boolean> {


    const paramId = type === "fair" ? "1" : "2";
    const paramType = type === "fair" ? "event" : "vroom";
    const paramStartDate = startDate.toISOString().slice(0, 10);
    const paramEndDate = endDate.toISOString().slice(0, 10);


    const urlencoded = new URLSearchParams();
    urlencoded.append("type", paramType);
    urlencoded.append("start_date", paramStartDate);
    urlencoded.append("end_date", paramEndDate);


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
    };


    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/schedule_set", requestOptions);
        if (!res.ok) {
            console.error("Failed to update date:", res.status);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error during updateDate:", err);
        return false;
    }

}
