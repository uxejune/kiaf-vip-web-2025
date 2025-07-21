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
import { Rsvp } from "@/types/collections"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    type: z.enum(["main", "timeslot"]),
    capacity: z.number().optional(),
    allowCompanion: z.boolean()
}).refine(
    (data) => {
        if (data.type === "main") {
            return typeof data.capacity === "number" && data.capacity >= 0;
        }
        return true;
    },
    {
        message: "Capacity must be a number greater than or equal to 0 when type is 'main'",
        path: ["capacity"],
    }
);

interface Props {
    rsvp: Rsvp;
}

export default function RsvpEditButton({ rsvp }: Props) {


    const [isLoading, setIsLoading] = useState(false);

    // Define a form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: rsvp.is_main === "1" ? "main" : "timeslot",
            capacity: rsvp.total_count ? Number(rsvp.total_count) : 0,
            allowCompanion: rsvp.companion != "0" ? true : false
        },
    })

    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        setIsLoading(true);

        //set isMain first

        const paramType = values.type === "main" ? "1" : "0";

        try {

            const res = await fetch("/api/vip_progem_rsvp_setmain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    program_id: rsvp.post_id, // Replace with actual id if needed
                    is_main: paramType
                }),
            });

            if (!res.ok) {
                console.error("Failed to update type:", res.status);
                return;
            }

            const result = await res.json();
            console.log("update reslt:", result);


        } catch (err) {
            console.error("API error:", err);
        }

        //set RSVP Allocation

        const paramCapacity = values.capacity !== undefined ? String(values.capacity) : "0"
        const paramAllowCompanion = values.allowCompanion == true ? "1": "0";

        try {

            const res = await fetch("/api/vip_program_rsvp_allocation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    program_id: rsvp.post_id, // Replace with actual id if needed
                    capacity: paramCapacity,
                    companion: paramAllowCompanion
                }),
            })

            if (!res.ok) {
                console.error("Failed to update allocation:", res.status);
                return;
            }

            const result = await res.json();
            // console.log("update reslt:", result);

        } catch (err) {
            console.error("API error:", err);
        }

        setIsLoading(false);
        window.location.reload();


    }

    return (
        <Dialog>
            <Form {...form}>

                <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit RSVP</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={form.handleSubmit(onSubmit)}>



                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col"
                                            >
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="main" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Main
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center gap-3">
                                                    <FormControl>
                                                        <RadioGroupItem value="timeslot" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Time Slot
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capacity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter capacity"
                                                disabled={form.watch("type") !== "main"}
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField

                                control={form.control}
                                name="allowCompanion"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            className="flex flex-row items-center gap-2"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    disabled={form.watch("type") !== "main"}

                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                Allow companion
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button disabled={isLoading} variant={"outline"}>Cancel</Button>
                            </DialogClose>

                            <Button type="submit" disabled={!form.formState.isDirty || isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
                            </Button>
                        </DialogFooter>

                    </form>

                </DialogContent>



            </Form>
        </Dialog>
    )
}