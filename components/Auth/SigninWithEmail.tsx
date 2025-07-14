"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { navigate } from "./actions"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { FormEvent } from 'react'
import { Button } from "../ui/button";

import { useTranslations } from "next-intl"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
    email: z.string().email({
        message: "please enter valid email",
    }),
    password: z.string().min(5,{
        message: "please enter correct password",
    }),
})

const SignInWithEmail = () => {

    const t = useTranslations('LogIn');
    const [isLoading, setIsLoading] = useState(false)
    
    const supabase = createClient()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        setIsLoading(true);



        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })

        if (error) {
            console.log(error)
        }

        navigate()
        setIsLoading(false);

    }
    
    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <h1>{t('title')}</h1>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            
                            <FormItem className="h-24">
                            <FormLabel>{t('emailLabel')}</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} required type="email" placeholder={t('emailPlaceHolder')} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            
                            <FormItem className="h-24">
                            <FormLabel>{t('passwordLabel')}</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} required type="password" placeholder={t('passwordPlaceHolder')} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            
                        )}
                    />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button disabled={isLoading} type="submit">{isLoading ? 'loading...' : t('title')}</Button>
                </CardFooter>
          </Card>
        </form>
    </Form>
    )
}

export default SignInWithEmail