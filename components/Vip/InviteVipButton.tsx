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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { GalleryVipInvite, PartnerVipInvite, vipInvite } from '@/lib/api';
import { UserTypes, VipListTypes } from "@/types/collections";
import { useRouter } from 'next/router';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { setAdminVipIviteLog, setVipDateLimited } from "@/utils/supabase/clientActions";





interface Props {
    userType?: UserTypes;
    vipType: VipListTypes;
    isInviteAllowed?: boolean;
    galleryId?: string;
    partnerId?: string;
    userEmail?: string;

    allocation?: number;
    invited?: number;
    singleAllocation?: number;
    singleInvited?: number;

}

export default function InviteVipButton({ userType = "admin", vipType, isInviteAllowed = true, galleryId, partnerId, userEmail, allocation, invited, singleAllocation, singleInvited }: Props) {

    const formSchema = z.object({
        email: z.string().trim().email({
            message: "Please provide proper email",
        }),
        phone: z.string().refine(value => {
            const cleaned = value.replace(/[\s\-]/g, ''); // 공백 및 하이픈 제거
            const phoneRegex = /^(\+?\d{7,15})$/;
            return cleaned === "" || phoneRegex.test(cleaned);
        }, {
            message: "Please provide a valid mobile phone number",
        }).optional()
            .or(z.literal('')),
        tier: z.enum(["1", "2"], {
            required_error: "Tier is required",
            invalid_type_error: "Tier must be either 1 or 2",
        }),
        date: z.date().optional()
    }).refine((data) => {
        if (data.tier === "1" && allocation !== undefined && invited !== undefined) {
            return allocation > invited;
        }
        if (data.tier === "2" && singleAllocation !== undefined && singleInvited !== undefined) {
            return singleAllocation > singleInvited;
        }
        return true;
    }, {
        path: ["tier"],
        message: "Allocation exceeded for the selected tier. Cannot invite more VIPs.",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInvitedEmailError, setIsInvitedEmailError] = useState<boolean>(false);


    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            phone: "",
            tier: "1",
            date: undefined
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('values:', values)

        setIsLoading(true);



        setIsInvitedEmailError(false)
        const email = values.email;
        const phone = values.phone ? values.phone.replace(/-/g, '') : '';
        const tier = values.tier;

        if (userType == "admin" || userType == "agent" ) {
            //run admin invite

            const res = await vipInvite(email, phone, tier)

            if (res.message == 402) {
                console.log('already invited email');
                setIsInvitedEmailError(true)
            } else {
                try {
                    if (values.date) {
                        // format date to YYYY-MM-DD to avoid timezone shifts
                        const dateString = format(values.date, 'yyyy-MM-dd');
                        await setVipDateLimited(res.id, res.invitation_code, dateString);
                    }

                    await setAdminVipIviteLog(res.invitation_code, userEmail ?? 'unknown');

                    window.location.reload();
                } catch (error) {
                    console.error("Failed to set addtional vip data:", error);
                }
            }
            setIsLoading(false);

        } else if (userType == "gallery") {

            if (galleryId) {
                //run gallery invite
                const res = await GalleryVipInvite(email, phone, galleryId, tier)

                if (res.message == 402) {
                    console.log('already invited email');
                    setIsInvitedEmailError(true)
                } else {

                    //refresh page
                    window.location.reload();
                }
            } else {
                console.log('gallery id is not provided')
            }
            setIsLoading(false);
        } else if (userType == "partner") {

            if (partnerId) {
                //run partner invite
                const res = await PartnerVipInvite(email, phone, partnerId, "1")

                if (res.message == 402) {
                    console.log('already invited email');
                    setIsInvitedEmailError(true)
                } else {

                    //refresh page
                    window.location.reload();
                }

            } else {
                console.log('partner id is not provided')
            }

        }


    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Invite {isAdmin? 'Admin' : 'Gallery'}</Button> */}
                <Button disabled={!isInviteAllowed} variant="outline">Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite VIP</DialogTitle>
                    <DialogDescription>
                        Click invite when you&#39;re done.
                        {userType}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@email.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide VIP&#39;s email<br />
                                        {isInvitedEmailError ? 'Already Invited Email' : null}

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile&#40;optional&#41;</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="000-0000-0000"
                                            {...field}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                field.onChange(inputValue);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Add + and the appropriate country code for numbers outside Korea.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VIP Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Normal</SelectItem>
                                            <SelectItem value="2">Single</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose VIP type (Normal or Single)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {(userType === "admin" || userType === "agent") &&

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Entrance Date</FormLabel>
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
                                                        const startDate = form.getValues("date");
                                                        return startDate ? date < startDate : false;
                                                    }}

                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>If a date is selected, the VIP will only be allowed entry on that day.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        }





                        <Button disabled={isLoading === true} type="submit">
                            {
                                // show loading... and disable button when submitting
                                isLoading ? "Loading..." : "Invite"
                            }
                        </Button>
                    </form>
                </Form>

                {/* <DialogFooter>
                    <Button type="submit">Invite</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
