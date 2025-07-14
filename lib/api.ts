export async function vipInvite(email: string, phone: string, tier: "1" | "2" = "1"  ) {

    const requestBody = JSON.stringify({
        email: email,
        phone: phone,
        tier: tier
    });

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/invite_vip`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }


}

export async function createAccount(userLogin: string, userPass: string, userEmail:string, newsLetter:number, langCode:string) {

    const requestBody = JSON.stringify({
        user_login: userLogin,
        user_pass: userPass,
        user_email: userEmail,
        news_letter:newsLetter,
        lang_code:langCode,
    });

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/create_account`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }


}

export async function deleteAccount(userId:string) {
    
    const requestBody = JSON.stringify({
        user_id: userId
    });

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/delete_account`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
    
}

export async function cancelVip(vipId: string) {


    const requestBody = JSON.stringify({
        vip_id: vipId
    });

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cancel_vip`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();
        return (data)
    } catch (err) {
        console.log(err);
        return (err)
    }

}

export async function VipProgramRsvpAllocation(programId: string, capacity: number, companion: number) {

    const requestBody = JSON.stringify({
        program_id: programId,
        capacity: capacity,
        companion: companion
    });

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vip_program_rsvp_allocation`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();
        return (data)
    } catch (err) {
        console.log(err);
        return (err)
    }

}


export async function GalleryVipInvite(email: string, phone: string, galleryId: string) {
    const requestBody = JSON.stringify({
        email: email,
        phone: phone,
        gallery: galleryId
    });


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/invite_gallery_vip`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
}

export async function PartnerVipInvite(email: string, phone: string, partnerId: string) {
    const requestBody = JSON.stringify({
        email: email,
        phone: phone,
        partner: partnerId
    });


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/invite_partner_vip`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
}

export async function GalleryVipCancel(vipId: string, galleryId: string) {
    const requestBody = JSON.stringify({
        vip_id: vipId,
        gallery: galleryId
    });



    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cancel_gallery_vip`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
}

export async function VipProgramApplicationCancel(applicationId: string) {
    const requestBody = JSON.stringify({
        application_id: applicationId,
    });



    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cancel_vip_program_applicant`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
}


export async function VipTicketDetail(invitationCode: string) {
    const requestBody = JSON.stringify({
        invitation_code: invitationCode,
    });

    // console.log('body :',requestBody);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cancel_gallery_vip`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
}

export async function GuestInvite(invitationCode: string, email?: string | null, mobile?: string | null) {
    const requestBody = JSON.stringify({
        invitation_code: invitationCode,
        email: email,
        mobile: mobile
    });

    // console.log('body :',requestBody);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/invite_guest`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {
        console.log(err);
        return (err)
    }
}

export async function artworkSetDocent(artworkId: string, language: string, text: string) {
    const requestBody = JSON.stringify({
        artwork_id: artworkId,
        lang_code: language,
        text: text
    });


    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/artwork_set_docent`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {

        console.log(err);
        return (err);

    }

}

export async function artworkDocentOpen(artworkId: string, open: boolean) {
    const requestBody = JSON.stringify({
        artwork_id: artworkId,
        open: open
    });


    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/artwork_docent_open`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {

        console.log(err);
        return (err);

    }

}

export async function artworkDocentDelete(artworkId: string, langCode: string) {
    const requestBody = JSON.stringify({
        artwork_id: artworkId,
        lang_code: langCode
    });


    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/artwork_docent_delete`, {
            method: "POST",
            headers: {
                Accept: "application/json",

            },
            body: requestBody
        });
        const data = await res.json();

        return (data)

    } catch (err) {

        console.log(err);
        return (err);

    }

}


