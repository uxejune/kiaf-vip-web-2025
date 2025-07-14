"use client"
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
import { useState } from "react";
import { GalleryVipInvite, artworkSetDocent, vipInvite } from '@/lib/api';
import { UserTypes, VipListTypes } from "@/types/collections";
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
    text: z.string().min(5, {
        message: "Please provide proper email",
    })
})

interface Props {
    artworkId: string;
    language: string;

}

export default function AddDocentButton({ artworkId,language }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const text = values.text;



        const res = await artworkSetDocent(artworkId,language,text);

        if (res.status == true){
            window.location.reload();
        } else {
            console.log(res);
        }

        setIsLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}><PlusIcon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Docent</DialogTitle>
                    <DialogDescription>
                        Click Generate when you&#39;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Text*</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="docent text"
                                            {...field}
                                        />
                                        {/* <Input type="text" placeholder="docent text" {...field} /> */}
                                    </FormControl>
                                    <FormDescription>
                                        Please docent text.<br />
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading===true} type="submit">
                            {
                                // show loading... and disable button when submitting
                                isLoading ? "Loading..." : "Generate"
                            }
                        </Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}