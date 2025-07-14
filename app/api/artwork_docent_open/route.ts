import { NextRequest, NextResponse } from 'next/server'

export async function POST(request:Request){
    const data = await request.json();

    const urlencoded = new URLSearchParams();
    urlencoded.append("artwork_id", data.artwork_id);
    urlencoded.append("open", data.open);

    try{

        const res = await fetch('https://kiafvip.kiaf.org/api/admin/docent_open',{

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