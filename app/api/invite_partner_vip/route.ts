import { NextRequest, NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'

// export const POST = async(request: NextApiRequest) => {
export async function POST(request: Request) {

    const data = await request.json();


    const urlencoded = new URLSearchParams();
    urlencoded.append("email", data.email);
    urlencoded.append("phone", data.phone);
    urlencoded.append("partner", data.partner);
    urlencoded.append("vip_tier", data.vip_tier);


    try{
        const res = await fetch(`https://kiafvip.kiaf.org/api/partner/vip_invite`,{
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