import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    try{

        const res = await fetch('https://kiafvip.kiaf.org/api/admin/banner_update', {
            method: "POST",
            body: formData
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