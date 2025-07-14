"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { z } from "zod"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { updateDate } from "@/utils/supabase/actions"


const formSchema = z
    .object({
        startDate: z.date({
            required_error: "Start date is required.",
        }),
        endDate: z.date({
            required_error: "End date is required.",
        }),
    })
    .refine((data) => data.endDate >= data.startDate, {
        message: "End date must be after or equal to start date.",
        path: ["endDate"],
    })

type FormValues = z.infer<typeof formSchema>


interface Props {
    type: "fair" | "viewingRoom";
    startDate?: Date;
    endDate?: Date;
}


export default function DateEditForm({ type, startDate, endDate }: Props) {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
        },
    })

    async function onSubmit(data: FormValues) {

        console.log('submit data:', data);

        setIsLoading(true);

        // console.log(data);

        const paramId = type === "fair" ? "1" : "2";
        const paramType = type === "fair" ? "event" : "vroom";
        const paramStartDate = format(data.startDate, "yyyy-MM-dd");
        const paramEndDate = format(data.endDate, "yyyy-MM-dd");

        try {

            const res = await fetch("/api/schedule_set", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: paramId, // Replace with actual id if needed
                    type: paramType,
                    startDate: paramStartDate,
                    endDate: paramEndDate,
                }),
            });

            if (!res.ok) {
                console.error("Failed to update date:", res.status);
                return;
            }

            const result = await res.json();
            console.log("Update result:", result);

        } catch (err) {
            console.error("API error:", err);
        }

        setIsLoading(false);
        window.location.reload();

    }

    return (
        <div className="mx-auto max-w-md  p-4">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a start date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>Select the start date for your range.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick an end date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            
                                            disabled={(date) => {
                                                const startDate = form.getValues("startDate");
                                                return startDate ? date < startDate : false;
                                            }}
                                            
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>Select the end date for your range.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={!form.formState.isDirty || isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
