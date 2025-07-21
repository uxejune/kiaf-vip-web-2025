import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {

    const data = await request.json();


    const urlencoded = new URLSearchParams();
    urlencoded.append("id", data.id);
    urlencoded.append("program_id", data.program_id);
    urlencoded.append("event_date", data.event_date);
    urlencoded.append("start_time", data.start_time);
    urlencoded.append("end_time", data.end_time);
    urlencoded.append("companion", data.companion);
    urlencoded.append("total_count", data.total_count);

    try{

        const res = await fetch(`https://kiafvip.kiaf.org/api/admin/timeslot_set`,{

            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlencoded
        });
        const data = await res.json();


        return new NextResponse(JSON.stringify(data),{
            status:200
        })

    } catch(err){
        console.log(err)
        return new NextResponse("server error", {
            status: 500
        })  
    }


}