import { NextRequest, NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(request: Request) {

    const data = await request.json();

    console.log('data :',data);

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", data.id);
    urlencoded.append("type", data.type);
    urlencoded.append("start_date", data.startDate);
    urlencoded.append("end_date", data.endDate);

    try{

        const res = await fetch(`https://kiafvip.kiaf.org/api/admin/schedule_set`,{

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