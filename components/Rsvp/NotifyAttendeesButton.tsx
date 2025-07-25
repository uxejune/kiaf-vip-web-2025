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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { VipProgramRsvpAllocation } from "@/lib/api";
import { Rsvp, TimeSlot } from "@/types/collections";
import { toast } from "sonner";


interface Props {
    rsvp: Rsvp;
    timeSlot?: TimeSlot;
}

const formSchema = z.object({
    message: z.string().max(150, "Maximum 150 characters allowed").nonempty("Message is required"),
});


export default function NotifyAttendeesButton({ rsvp, timeSlot }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const closeRef = useRef<HTMLButtonElement>(null);



    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: ""
        },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true);

        console.log('values :', values);

        if (!timeSlot) {
            //main
            console.log('Main', rsvp.post_id)

            try {

                const res = await fetch("/api/vip_program_send_alert", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        program_id: rsvp.post_id, // Replace with actual id if needed
                        message: values.message
                    }),
                })

                if (!res.ok) {
                    console.error("Failed to send alarm to main applicants:", res.status);
                    return;
                }

                const result = await res.json();
                // console.log("update reslt:", result);
                setIsLoading(false);
                closeRef.current?.click(); // close dialog
                toast("Push Alarm has been sent.");
                setIsLoading(false);

            } catch (err) {
                console.error("API error:", err);
                setIsLoading(false);
            }


        } else {
            //time slot
            try {

                const res = await fetch("/api/timeslot_send_alert", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: timeSlot.id, // Replace with actual id if needed
                        message: values.message
                    }),
                })

                if (!res.ok) {
                    console.error("Failed to send alarm to timeslot applicants:", res.status);
                    return;
                }

                const result = await res.json();
                // console.log("update reslt:", result);
                setIsLoading(false);
                toast("Push Alarm has been sent.");
                closeRef.current?.click(); // close dialog
                setIsLoading(false);

            } catch (err) {
                console.error("API error:", err);
                setIsLoading(false);
            }

        }



    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button ref={closeRef}>Notify Attendees</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Notify Attendees</DialogTitle>
                    <DialogDescription>
                        신청자의 기기에 푸시알람 메세지를 보냅니다.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message*</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your message (max 150 characters)" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide a message to notify attendees.<br />
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading === true} type="submit">
                            {
                                // show loading... and disable button when submitting
                                isLoading ? "Loading..." : "Send"
                            }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}