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
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { VipProgramRsvpAllocation } from "@/lib/api";

const formSchema = z.object({
    capacity: z.coerce.number().min(0, { message: "RSVP Allocation must be a number greater than or equal to 0" }),
    allowCompanion: z.boolean()
});
interface Props {
    programId: string;
    settedCapacity?: number | null;
    allowCompanion?: boolean;
}

export default function SetRsvpButton({ programId, settedCapacity, allowCompanion }: Props) {



    const [isLoading, setIsLoading] = useState<boolean>(false);
    const supabase = createClient();

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            capacity: settedCapacity ? settedCapacity : 0,
            allowCompanion: allowCompanion ? allowCompanion : false,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        

        
        const allowCompanionValue = values.allowCompanion ? 1 : 0;
        try {

        

            await VipProgramRsvpAllocation(programId,values.capacity, allowCompanionValue )
            window.location.reload();
            setIsLoading(false);

        } catch (error) {
            console.error('Error cancelling VIPs:', error);
            setIsLoading(false);

            // Handle error states or notifications here
        }



    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"}>Set</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle> Program Allocation</DialogTitle>
                    <DialogDescription>
                        Set Allocation.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="capacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Allocation*</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Allocation count" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide program&#39;s allocation<br />
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="allowCompanion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Allow Companion </FormLabel>
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormDescription>
                                        Check if companions are allowed
                                    </FormDescription>
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
