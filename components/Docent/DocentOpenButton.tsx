"use client"

import { Button } from "@/components/ui/button"
import { artworkDocentOpen } from "@/lib/api";
import { useState } from "react";

interface Props {
    artworkId: string;
    isOpen: boolean;
}

export default function DocentOpenButton({artworkId, isOpen}: Props){
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const targetValue = !isOpen;

    async function onSet(){
        setIsLoading(true);

        const res = await artworkDocentOpen(artworkId,targetValue)

        if (res.status == true){
            window.location.reload();
        } else {
            console.log(res);
        }

        setIsLoading(false);

    }

    return(
        <Button   onClick={onSet} variant={"outline"} size={"sm"}>{isOpen? 'Close': 'Open' }</Button>
    )

}