import { NextRequest, NextResponse } from 'next/server'

// export const POST = async(request: NextApiRequest) => {
export async function POST(request: Request) {

    const data = await request.json();




    try{

        const res = await fetch(`https://kiafvip.kiaf.org/api/invite/ticket_detail?invitation_code=${data.invitation_code}`,{

            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const result = await res.json();


        return new NextResponse(JSON.stringify(result),{
            status:200
        })

    } catch(err){
        console.log(err)
        return new NextResponse("server error", {
            status: 500
        })  
    }

}