import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request) {

    const data = await request.json();


    const urlencoded = new URLSearchParams();
    urlencoded.append("program_id", data.program_id);
    urlencoded.append("is_main", data.is_main);

    try{

        const res = await fetch(`https://kiafvip.kiaf.org/api/admin/vip_program_rsvp_setmain`,{

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