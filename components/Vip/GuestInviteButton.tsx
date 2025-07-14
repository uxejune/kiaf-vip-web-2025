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
import { GalleryVipInvite, GuestInvite, vipInvite } from '@/lib/api';
import { guestInvitationTypeKeys, UserTypes } from "@/types/collections";
import { GuestInvitationTypes } from "@/types/collections";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { decrypt } from "@/lib/cryption";


interface Props {
    invitationCode: string;

    formTitle: string;
    formDescription: string;
    guestInvitationTypeLable: string;
    phoneLabel: string;
    phoneValidationMessage: string;
    emailLabel: string;
    emailValidationMessage: string;
    phoneDescription: string;
    emailDescription: string;
    validationMessage: string;
    submitButton: string;

}

export default function GuestInviteButton({ invitationCode, formTitle, formDescription, guestInvitationTypeLable, phoneLabel, phoneValidationMessage, emailLabel, emailValidationMessage, phoneDescription, emailDescription, validationMessage, submitButton }: Props) {

    const [guestInvitationType, setGuestInvitationType] = useState<GuestInvitationTypes>("phone");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const formSchema = z.object({
        guestInvitationType: z.enum(['email', 'phone']),
        email: z.string().email().min(5, {
            message: emailValidationMessage,
        }).optional().or(z.literal('')),
        phone: z.string().refine(value => {
            // Korean mobile number regex pattern
            const koreanPhoneRegex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
            return koreanPhoneRegex.test(value!);
        }, {
            message: phoneValidationMessage,
        }).optional()
            .or(z.literal('')),
    }).refine(data => {
        if (data.guestInvitationType === 'email' && !data.email) {
            return false;
        }
        if (data.guestInvitationType === 'phone' && !data.phone) {
            return false;
        }
        return true;
    }, {
        message: validationMessage,
        path: [guestInvitationType], // Set the path of the error to the guestInvitationType field
    });

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guestInvitationType: "phone",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);



        const guestInvitationType = values.guestInvitationType;
        const phone = values.guestInvitationType == 'phone' ? values.phone : "";
        const email = values.guestInvitationType == 'email' ? values.email : "";

        // const decryptedInvitationCode = decrypt(invitationCode);


        const res = await GuestInvite(invitationCode, email, phone)


        if (res.status) {

            window.location.reload();

        } else {
            console.log('error :', res)
        }

        setIsLoading(false);

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className=" w-[10rem] shrink-0" >INVITE A GUEST</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{formTitle}</DialogTitle>
                    <DialogDescription>
                        {formDescription}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="guestInvitationType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>{guestInvitationTypeLable}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {

                                                field.onChange(value);

                                                setGuestInvitationType(value == "phone" ? "phone" : "email")

                                            }}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="phone" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {phoneLabel}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="email" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {emailLabel}
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {guestInvitationType == 'email' ?
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{emailLabel}*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@email.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {emailDescription}<br />
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null
                        }

                        {guestInvitationType == 'phone' ?

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{phoneLabel}*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="000-0000-0000"
                                                {...field}
                                                onChange={(e) => {
                                                    const formattedValue = e.target.value.replace(
                                                        /(\d{3})(\d{4})(\d{4})/,
                                                        '$1-$2-$3'
                                                    );
                                                    field.onChange(formattedValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {phoneDescription}
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : null
                        }

                        <Button disabled={isLoading === true} type="submit">
                            {isLoading ? "Loading..." : "Invite"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )

}