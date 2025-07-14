import { PersonIcon, ImageIcon, PlayIcon, PlusIcon, ExitIcon, ViewGridIcon } from "@radix-ui/react-icons";
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
import DocentDeleteButton from "./DocentDeleteButton";

interface Props {
    docentUrl: string;
    docentText: string;
    artworkId: string;
    langCode: string;
}

export default function DocentPlayer({ docentUrl, docentText, artworkId, langCode }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}><PlayIcon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Docent</DialogTitle>
                </DialogHeader>

                <DialogContent>
                    <audio controls>
                        <source src={docentUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    {docentText}
                    <DocentDeleteButton artworkId={artworkId} langCode={langCode}  />
                </DialogContent>
            </DialogContent>
        </Dialog>
    )
}