import { PersonIcon, ImageIcon, PlayIcon, PlusIcon, ExitIcon, ViewGridIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";

interface Props {
    artworkId:string
    decs:string
    language:string
}

export default function DescButton({ artworkId, decs,language }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}><CheckIcon />{language}</Button>
                
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Decs</DialogTitle>
                </DialogHeader>

                <DialogContent>
                    {decs}
                    
                </DialogContent>
            </DialogContent>
        </Dialog>
    )
}