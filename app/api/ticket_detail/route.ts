import { NextRequest, NextResponse } from 'next/server'

type NextRequestInit = RequestInit & { next?: { revalidate?: number; tags?: string[] } };

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const invitationCode = searchParams.get('invitation_code');

    if (!invitationCode) {
        return new NextResponse('missing required query parameter: invitation_code', { status: 400 });
    }

    console.log('invitation code',invitationCode);

    const requestOptions: NextRequestInit = {
        method: "GET",
        redirect: "follow",
        headers: { Accept: 'application/json' },
        cache: 'no-store',
    };
    try {
        // Re-encode the decoded query param so that '+' and '=' are preserved as %2B / %3D
        const upstreamQS = new URLSearchParams({ invitation_code: invitationCode }).toString();
        const upstreamUrl = `https://kiafvip.kiaf.org/api/invite/ticket_detail?${upstreamQS}`;
        const res = await fetch(upstreamUrl, requestOptions);

        if (!res.ok) {
            const text = await res.text();
            console.error('Upstream API failed:', res.status, text);
            return new NextResponse(text || 'upstream error', { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (err) {
        console.error(err);
        return new NextResponse(
            `server error: ${err instanceof Error ? err.message : String(err)}`,
            { status: 500 }
        );
    }
}