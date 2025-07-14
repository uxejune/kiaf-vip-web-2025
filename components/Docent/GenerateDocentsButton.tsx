"use client"
import { PersonIcon, ImageIcon, PlayIcon, PlusIcon, ExitIcon, ViewGridIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import {  artworkSetDocent,artworkDocentOpen } from '@/lib/api';
import { Artwork, UserTypes, VipListTypes } from "@/types/collections";
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "../ui/badge";
import { refineDesc } from "@/lib/utils";


interface ArtworkStatus {
    artworkId: string
    isKoDocentCreated: boolean
    isEnDocentCreated: boolean
    isDocentOpen: boolean
}

interface Props {
    artworks: Artwork[]

}

export default function GenerateDocentsButton({ artworks }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [artworksStatus, setArtworksStatus] = useState<ArtworkStatus[]>([])

    useEffect(() => {
        // Initialize artworksStatus based on the artworks length
        const initialStatus = artworks.map((artwork) => ({
            artworkId: artwork.id,
            isKoDocentCreated: artwork.ko_url ? true : false,
            isEnDocentCreated: artwork.en_url ? true : false,
            isDocentOpen: artwork.status == "1" ? true : false,
        }));

        setArtworksStatus(initialStatus);
    }, [artworks]); // Run the effect when artworks prop changes


    async function handleGenerate() {
        setIsLoading(true);
        const updatedStatuses = [...artworksStatus];
    
        // Use Promise.all to handle all asynchronous operations
        await Promise.all(
            artworks.map(async (artwork, index) => {

      

                let koProcessStatus = undefined;
                let enProcessStatus = undefined;
    
                // The English and Korean descriptions are swapped on the artwork list.
                if (artwork.desc_en) {
                    // go to generation process for ko docent as ko desc exists
                    
                    // refine desc
                    const refinedDesc = refineDesc(artwork.desc_en);
    
                    // generate docent
                    const res = await artworkSetDocent(artwork.id, "ko", refinedDesc);
    
                    if (res.status == true) {
                        // update status
                        koProcessStatus = true;
                        updatedStatuses[index] = {
                            ...updatedStatuses[index],
                            isKoDocentCreated: true, 
                        };
                    } else {
                        koProcessStatus = false;
                        console.log(`error during the process ko ${artwork.title}:`, res);
                    }
                }
    
                if (artwork.desc_ko) {
                    // go to generation process for en docent as ko desc exists
    
                    // refine desc
                    const refinedDesc = refineDesc(artwork.desc_ko);
    
                    // generate docent
                    const res = await artworkSetDocent(artwork.id, "en", refinedDesc);
    
                    if (res.status == true) {
                        // update status
                        enProcessStatus = true;
                        updatedStatuses[index] = {
                            ...updatedStatuses[index],
                            isEnDocentCreated: true, 
                        };
                    } else {
                        console.log(`error during the process en ${artwork.title}:`, res);
                    }
                }

                
    
                if (artwork.status != "1" ) {
                    
    
                    if ((artwork.desc_en && koProcessStatus == true) || (artwork.desc_ko && enProcessStatus == true)) {
                        // open docent
                        
                        

                        const res = await artworkDocentOpen(artwork.id, true);
    
                        if (res.status == true) {
                            updatedStatuses[index] = {
                                ...updatedStatuses[index],
                                isDocentOpen: true, 
                            };
                        } else {
                            console.log(res);
                        }
                    }
                }
            })
        );
    
 
    
        setArtworksStatus(updatedStatuses);
        setIsLoading(false);
    }
    

    const handleComplete = () => {
        window.location.reload();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"default"} disabled={artworks.length == 0} >Generate Docents</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Generate Docent</DialogTitle>
                    <DialogDescription>
                        Click Generate when you&#39;re done.
                    </DialogDescription>
                </DialogHeader>
                <ul className="flex flex-col gap-1">
                    {artworks.map((artwork, index) => (
                        <li key={artwork.id} className="flex gap-4">
                            {artwork.title}
                            <div className="flex gap-2"> 
                                {artwork.desc_en ? artworksStatus[index]?.isKoDocentCreated ? <Badge variant={"default"}><CheckIcon />Ko Docent</Badge> : <Badge variant={"secondary"}><Cross1Icon />Ko Docent</Badge> : null}
                                {artwork.desc_ko ? artworksStatus[index]?.isEnDocentCreated ? <Badge variant={"default"}><CheckIcon />En Docent</Badge> : <Badge variant={"secondary"}><Cross1Icon />En Docent</Badge> : null}
                                {artworksStatus[index]?.isDocentOpen ? <Badge variant={"default"}>Open</Badge> : <Badge variant={"secondary"}>Closed</Badge>}
                            </div>
                        </li>
                    ))}
                </ul>
                <Button onClick={handleGenerate} variant={"default"} disabled={isLoading == true}>{isLoading? 'Loading...' : 'Generate Docents'}</Button>
                <Button onClick={handleComplete} variant={"default"} >Complete</Button>
            </DialogContent>
        </Dialog>
    )
}