"use client"

import { Button } from "@/components/ui/button"
import { artworkDocentDelete, artworkDocentOpen } from "@/lib/api";
import { useState } from "react";

interface Props {
    artworkId: string;
    langCode: string;
}

export default function DocentDeleteButton({artworkId, langCode}: Props){
    const [isLoading, setIsLoading] = useState<boolean>(false);



    async function onSet(){
        setIsLoading(true);

        const res = await artworkDocentDelete(artworkId,langCode)

        if (res.status == true){
            window.location.reload();
        } else {
            console.log(res);
        }

        setIsLoading(false);

    }

    return(
        <Button   onClick={onSet} variant={"destructive"} size={"sm"} disabled={isLoading == true}>{isLoading ? 'Loading...' : 'Delete' }</Button>
    )

}