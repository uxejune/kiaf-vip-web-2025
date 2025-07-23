"use client"

import React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
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


const formSchema = z
    .object({
        date: z.date({
            required_error: "Please select date",
        }),
        startTime: z
            .string()
            .regex(
                /^(?!00:00:00$)([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                { message: "Please enter start time" }
            ),
        endTime: z
            .string()
            .regex(
                /^(?!00:00:00$)([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                { message: "Please enter end time" }
            ),
        allowCompanion: z.boolean(),
        capacity: z.number().min(0, { message: "Capacity must be 0 or more" }).optional(),
    })
    .refine(
        (data) => {
            const start = data.startTime.split(":").map(Number);
            const end = data.endTime.split(":").map(Number);

            const startTotalSeconds = start[0] * 3600 + start[1] * 60 + start[2];
            const endTotalSeconds = end[0] * 3600 + end[1] * 60 + end[2];

            return endTotalSeconds > startTotalSeconds;
        },
        {
            message: "종료 시간은 시작 시간보다 늦어야 합니다.",
            path: ["endTime"],
        }
    );


interface Props {
    rsvp: Rsvp;
}

export default function AddTimeSlotButton({ rsvp }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            startTime: "00:00:00",
            endTime: "00:00:00",
            allowCompanion: false,
            capacity: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Submitted values:", values);
        setIsLoading(true);

        const paramDate = values.date.toISOString().split("T")[0];
        const paramStartTime = values.startTime.slice(0, 5); // '00:00'
        const paramEndTime = values.endTime.slice(0, 5); // '00:00'
        const paramCompanion = values.allowCompanion == true ? "1" : "0";
        const paramCapacity = values.capacity !== undefined ? String(values.capacity) : "0";

        const apiBody = {
            program_id: rsvp.post_id,
            event_date: paramDate,
            start_time: paramStartTime,
            end_time: paramEndTime,
            companion: paramCompanion,
            total_count: paramCapacity,
        }

        console.log("api body :", apiBody);


        try {
            const res = await fetch("/api/timeslot_set", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    program_id: rsvp.post_id,
                    event_date: paramDate,
                    start_time: paramStartTime,
                    end_time: paramEndTime,
                    companion: paramCompanion,
                    total_count: paramCapacity,
                }),
            });

            if (!res.ok) {
                console.error("Failed to add timeslot:", res.status);
                return;
            }

            const result = await res.json();
            console.log("Timeslot added:", result);
            // window.location.reload();
        } catch (err) {
            console.error("API error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <Form {...form}>
                <DialogTrigger asChild>
                    <Button variant="outline" size={"sm"}>Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Time Slot</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            id="time-picker"
                                            step="1"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            id="time-picker"
                                            step="1"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
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
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                            className="bg-background appearance-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="allowCompanion"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        Allow companion
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button disabled={isLoading} variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog>
    );
}