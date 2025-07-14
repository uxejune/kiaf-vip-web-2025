"use client"

import React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label"
import { Rsvp, Vip } from "@/types/collections"
import { Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    tier: z.enum(["1", "2"], {
        required_error: "Tier is required",
        invalid_type_error: "Tier must be either 1 or 2",
    })
});

interface Props {
    canceledVip: Vip;
}

export default function ReinviteCanceledVipButton({ canceledVip }: Props) {

    const [isLoading, setIsLoading] = useState(false);

    // Define a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tier: "1"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);

        setIsLoading(true);
        try {
            const res = await fetch("/api/vip_reinvite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vip_id: canceledVip.id,
                    vip_tier: values.tier,
                }),
            });

            if (!res.ok) {
                console.error("Failed re-invite:", res.status);
                return;
            }

            const result = await res.json();
            window.location.reload();
            // console.log("sent");
        } catch (err) {
            console.error("API error:", err);
        } finally {
            setIsLoading(false);
        }


    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"}>Re-invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Re-invite</DialogTitle>
                    <DialogDescription>
                        {canceledVip.email}
                        {canceledVip.mobile && <><br/>{canceledVip.mobile}</> }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="tier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VIP Tier</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Tier 1</SelectItem>
                                            <SelectItem value="2">Tier 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose VIP tier (1 or 2).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button disabled={isLoading === true} type="submit">
                            {
                                // show loading... and disable button when submitting
                                isLoading ? "Loading..." : "Re-invite"
                            }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}