"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
import { vipInvite } from '@/lib/api';
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
    boothCode: z.string().min(2, { message: "Please provide booth code" }),
})

interface Props {
    galleryName: string;
    galleryId: string;
    settedBoothCode?: string;
}

export default function BoothCodeSetButton({galleryName, galleryId, settedBoothCode }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = createClient();

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            boothCode: settedBoothCode ? settedBoothCode : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const boothCode = values.boothCode;

        const boothCodeData = {
            id: galleryId,
            code: boothCode
        }

        if (settedBoothCode) {
            //update the existing quota

            const { data, error } = await supabase
                .from('galleryBoothCode')
                .update(boothCodeData)
                .eq('id', galleryId);

            if (error) {
                console.error("Error inserting data:", error);
            } else {
    

                //refresh the page
                window.location.reload();

            }


        } else {
            //insert new quota
            const { data, error } = await supabase
                .from('galleryBoothCode')
                .insert([boothCodeData]);

            if (error) {
                console.error("Error inserting data:", error);
            } else {
        

                //refresh the page
                window.location.reload();
            }

        }

        setIsLoading(false);
    }


    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"}>Set</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Booth Code Submission</DialogTitle>
                    <DialogDescription>
                        Set {galleryName} Booth Code.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="boothCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Booth Code*</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="booth code" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide gallery&#39;s boothcode<br/>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading===true} type="submit">
                            {
                                // show loading... and disable button when submitting
                                isLoading ? "Loading..." : "Set"
                            }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )

}