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
    quota: z.number().min(0, { message: "Quota must be a number greater than or equal to 0" }),
    singleQuota: z.number().min(0, { message: "Quota must be a number greater than or equal to 0" })
})
interface Props {
    partnerId: string;
    settedQuota?: number;
    settedSingleQuota? : number;
}


export default function PartnerQuotaSetButton({ partnerId, settedQuota, settedSingleQuota }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = createClient();

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quota: settedQuota ? settedQuota : 0,
            singleQuota: settedSingleQuota ? settedSingleQuota : 0
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const quota = values.quota;
        const singleQuota = values.singleQuota;

        const quotaData = {
            id: partnerId,
            quota: quota,
            singleQuota: singleQuota
        }

        if (settedQuota) {
            //update the existing quota

            const { data, error } = await supabase
                .from('partnerVipQuota')
                .update(quotaData)
                .eq('id', partnerId);

            if (error) {
                console.error("Error updating data:", error);
            } else {


                //refresh the page
                window.location.reload();

            }


        } else {
            //insert new quota
            const { data, error } = await supabase
                .from('partnerVipQuota')
                .insert([quotaData]);

            if (error) {
                console.error("Error inserting data:", error);
            } else {


                //refresh the page
                window.location.reload();
            }

        }

        setIsLoading(false);


    }

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"}>Set</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle> VIP Allocation</DialogTitle>
                    <DialogDescription>
                        Set Partner VIP Allocation.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="quota"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Allocation*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="quota number"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="singleQuota"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Single Allocation</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="quota number"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading === true} type="submit">
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