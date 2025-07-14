import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: Request){

    const data = await request.json();

    const urlencoded = new URLSearchParams();
    urlencoded.append("user_login", data.user_login);
    urlencoded.append("user_pass", data.user_pass);
    urlencoded.append("user_email", data.user_email);
    urlencoded.append("news_letter", data.news_letter);
    urlencoded.append("lang_code", data.lang_code);


    try{

        const res = await fetch(`https://kiafvip.kiaf.org/api/admin/regist`,{

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