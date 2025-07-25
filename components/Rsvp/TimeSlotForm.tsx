"use client"

import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
import { Rsvp, TimeSlot } from "@/types/collections"
import { Calendar } from "../ui/calendar"
import { ChevronDownIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
    timeSlot?: TimeSlot;
    rsvpId: string;
}

const formSchema = z.object({
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
    capacity: z.number().min(0, { message: "Capacity must be 0 or more" }).optional()
})

export default function TimeSlotForm({ timeSlot, rsvpId }: Props) {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: timeSlot?.event_date ? new Date(timeSlot.event_date) : undefined,
            startTime: timeSlot?.start_time ? timeSlot?.start_time : "00:00:00",
            endTime: timeSlot?.end_time ? timeSlot?.end_time : "00:00:00",
            allowCompanion: timeSlot?.companion ? timeSlot?.companion === "1" ? true : false : false,
            capacity: timeSlot?.total_count ? Number(timeSlot.total_count) : 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Submitted values:", values);
        console.log("timeSlot id: ", timeSlot?.id);
        setIsLoading(true);

        const y = values.date.getFullYear();
        const m = String(values.date.getMonth() + 1).padStart(2, "0");
        const d = String(values.date.getDate()).padStart(2, "0");
        const paramDate = `${y}${m}${d}`; // 결과 예: "20250802"

        // const paramDate = values.date.toISOString().split("T")[0];
        const paramStartTime = values.startTime.slice(0, 5); // '00:00'
        const paramEndTime = values.endTime.slice(0, 5); // '00:00'
        const paramCompanion = values.allowCompanion == true ? "1" : "0";
        const paramCapacity = values.capacity !== undefined ? String(values.capacity) : "0";

        try {
            const res = await fetch("/api/timeslot_set", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: timeSlot?.id ?? undefined,
                    program_id: rsvpId,
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
            window.location.reload();
        } catch (err) {
            console.error("API error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <p>
                    {rsvpId} <br />
                    {timeSlot?.id}
                </p>

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

                <Button type="submit" disabled={isLoading || (!!timeSlot && !form.formState.isDirty)}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
                </Button>

            </form>

        </Form>
    )
}