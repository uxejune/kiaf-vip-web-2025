'use client';
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
import { createAccount, GalleryVipInvite, GuestInvite, PartnerVipInvite, vipInvite } from '@/lib/api';
import { CreatedId, guestInvitationTypeKeys, Partner, UserTypes } from "@/types/collections";
import { GuestInvitationTypes } from "@/types/collections";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { decrypt } from "@/lib/cryption";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import supabaseClient from "@/utils/supabase/supabaseClient";
import { createClient } from "@/utils/supabase/client";

interface Props {
    partners: Partner[];
}

export default function CreatedIdForm({ partners }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [createdIdList, setCreatedIdList] = useState<CreatedId[]>([]);
    const supabase = createClient();

    const formSchema = z.object({
        idPreFix: z.string().min(3, { message: 'please enter pre fix text' }),
        count: z.number().min(1, { message: "please enter at least 1 count" }),
        partnerId: z.string().min(3, { message: 'please select partner' }),
        offset: z.number().optional(),
        tier: z.enum(["1", "2"]),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idPreFix: "",
            count: 0,
            partnerId: "",
            tier: "1",
        },
    })

    function getRandomPassword() {
        const characters = 'abcdefghjkmnpqrstuvwxyz23456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    function padNumberWithZeros(num: number, length: number = 3): string {
        const numString = num.toString();
        if (numString.length >= length) {
            return numString;
        }
        return numString.padStart(length, '0');
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);



        //empty Created ID List
        setCreatedIdList([]);

        const newCreatedIdList = [];

        for (let i = 0; i < values.count; i++) {


            //set offset
            const offset = values.offset ? values.offset : 0;


            const accountName = `${values.idPreFix}${padNumberWithZeros(i + offset + 1)}`;
            const password = getRandomPassword();
            const email = `${accountName}@${values.idPreFix}kiafpartner.org`;
            let vipInvitation = false;
            let supabaseRegistration = false;
            let idCreation = false;
            let accountId: string | null = null;
            const vipId: string | null = null;
            const vipTier: string = values.tier;


            //1. try to invite VIP
            const inviteRes = await PartnerVipInvite(email, "", values.partnerId, vipTier)

            console.log('invite data', {
                email: email,
                partnerId: values.partnerId,
                vipTier: vipTier
            })

            if (inviteRes.message == 402) {
                //false to invite
                console.log('fail to invite user', inviteRes)
            } else {
                //success to invite

                vipInvitation = true


                //2. try to make Kiaf account

                const createAccountRes = await createAccount(
                    accountName,
                    password,
                    email,
                    0,
                    "ko");

                if (createAccountRes.status == false) {

                    //fail to create the account

                } else {



                    //success to create the account
                    idCreation = true;
                    accountId = createAccountRes.user_id;


                    //3. try to regist into Supabase

                    const { data, error } = await supabase
                        .from('createdAccount')
                        .insert({
                            id: accountId,
                            name: accountName,
                            password: password,
                            email: email,
                            partner_id: values.partnerId,
                            tier: vipTier,
                        })

                    if (error) {
                        console.error("Error inserting data:", error);
                    } else {
                        supabaseRegistration = true

                    }

                }

            }



            // set account data after invitation
            const accountData: CreatedId = {
                id: accountId,
                name: accountName,
                password: password,
                email: email,
                partner_id: values.partnerId,
                idCreation: idCreation,
                supabaseRegistration: supabaseRegistration,
                vipInvitation: vipInvitation,
                tier: vipTier
            }


            //4. insert into created ID list

            newCreatedIdList.push(accountData);
        }

        // Set the state once with the accumulated array
        setCreatedIdList(newCreatedIdList);


        setIsLoading(false);
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex w-full gap-4">
                        <FormField
                            control={form.control}
                            name="idPreFix"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Pre Fix*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Count*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="partnerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Partner*</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a partner account" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {partners.map((partner) => (
                                                <SelectItem key={partner.user_id} value={partner.user_id}>{partner.nickname}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="offset"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offset</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tier*</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select tier" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Normal</SelectItem>
                                            <SelectItem value="2">Single</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <Button disabled={isLoading === true} type="submit">
                        {
                            isLoading ? "Loading..." : "Create"
                        }
                    </Button>
                </form>
            </Form>

            <hr className="my-4" />

            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>ID Creation</TableHead>
                        <TableHead>Supabase Registration</TableHead>
                        <TableHead>VIP Invitation</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {createdIdList.map((createdId) => (
                        <TableRow key={createdId.name}>
                            <TableCell>
                                {createdId.id}
                            </TableCell>
                            <TableCell>
                                {createdId.name}
                            </TableCell>
                            <TableCell>
                                {createdId.password}
                            </TableCell>
                            <TableCell>
                                {createdId.email}
                            </TableCell>
                            <TableCell>
                                {createdId.tier === "1" ? <Badge>Normal</Badge> : <Badge>Single</Badge> }
                            </TableCell>
                            <TableCell>
                                {createdId.idCreation ? <Badge variant={"outline"}>Done</Badge> : <Badge>False</Badge>}
                            </TableCell>
                            <TableCell>
                                {createdId.supabaseRegistration ? <Badge variant={"outline"}>Done</Badge> : <Badge>False</Badge>}
                            </TableCell>
                            <TableCell>
                                {createdId.vipInvitation ? <Badge variant={"outline"}>Done</Badge> : <Badge>False</Badge>}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}