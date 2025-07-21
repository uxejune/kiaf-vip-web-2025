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
import { GalleryVipInvite, PartnerVipInvite, vipInvite, createAccount } from '@/lib/api';
import { UserTypes, VipListTypes } from "@/types/collections";
import { useRouter } from 'next/router';

const formSchema = z.object({

    id: z.string().min(3, { message: 'please enter ID' }),

})


interface Props {
    isInviteAllowed: boolean;
    partnerId: string;
    defaultPassword: string;
}

export default function DeskCreateVIPAccountButton({ isInviteAllowed, partnerId, defaultPassword }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInvitedIdError, setIsInvitedIdError] = useState<boolean>(false);
    const [isInvitedEmailError, setIsInvitedEmailError] = useState<boolean>(false);

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        // console.log(values);


        const id = values.id;
        const email = `${id}@kiaf.org`;

        //1. try to invite VIP
        const inviteRes = await PartnerVipInvite(email, "", partnerId, "1")

        if (inviteRes.message == 402) {
            //false to invite
            setIsInvitedIdError(true)

        } else {
            //success to invite

            //2. try to make Kiaf account

            const createAccountRes = await createAccount(
                id,
                defaultPassword,
                email,
                0,
                "ko");

            if (createAccountRes.status == false) {

                //fail to create the account

            } else {

            }

        }

        setIsLoading(false);

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Invite {isAdmin? 'Admin' : 'Gallery'}</Button> */}
                <Button disabled={!isInviteAllowed} variant="outline">계정생성초대</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite VIP</DialogTitle>
                    <DialogDescription>
                        Click invite when you&#39;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

