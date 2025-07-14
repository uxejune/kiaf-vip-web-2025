'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Rsvp } from "@/types/collections";
import { Applicant } from "@/types/collections";
import SetRsvpButton from "./SetRsvpButton";
import Link from "next/link";
import { decrypt, encrypt } from "@/lib/cryption";
import CancelApplicantButton from "./CancelApplicantButton";

interface Props {
    applicants: Applicant[];
}

export default function ApplicantList({applicants}:Props) {
    return (
        <Table className='mb-4'>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Companion</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applicants.map((applicant)=> (
                    <TableRow key={applicant.email}>
                        <TableCell>
                            {applicant.email}
                        </TableCell>
                        <TableCell>
                            {applicant.mobile}
                        </TableCell>
                        <TableCell>
                            {applicant.with_companion == 2 ? <Badge variant={"default"}>With Companion</Badge> : <Badge variant={"secondary"}>No Companion</Badge>}
                        </TableCell>
                        <TableCell>
                            <CancelApplicantButton applicant={applicant}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}