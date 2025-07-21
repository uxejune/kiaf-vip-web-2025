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
import { Rsvp, TimeSlot } from "@/types/collections"
import { Loader2, Pen } from "lucide-react"
import TimeSlotForm from "./TimeSlotForm"


interface Props {
    rsvpId: string;
    timeSlot: TimeSlot;
}

export default function TimeSlotEditButton({ timeSlot,rsvpId }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} >
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit RSVP</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <TimeSlotForm   timeSlot={timeSlot} rsvpId={rsvpId}/>
            </DialogContent>


        </Dialog>
    )
}