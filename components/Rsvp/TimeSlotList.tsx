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
import { Rsvp, TimeSlot } from "@/types/collections";
import { Applicant } from "@/types/collections";
import SetRsvpButton from "./SetRsvpButton";
import Link from "next/link";
import { decrypt, encrypt } from "@/lib/cryption";
import CancelApplicantButton from "./CancelApplicantButton";
import { Trash } from "lucide-react";
import TimeSlotDeleteButton from "./TimeSlotDeleteButton";
import TimeSlotItem from "./TimeSlotItem";
import { time } from "console";

interface Props {
    rsvp: Rsvp;
}


export default function TimeSlotList({ rsvp }: Props) {


    if (!rsvp.timeSlots) {
        return (
            <p>no time slots</p>
        )
    }

    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [timeSlotsState, setTimeSlotsState] = useState<TimeSlot[]>(
      rsvp.timeSlots.map(ts => ({ ...ts, applicants: [] }))
    );

    useEffect(() => {
      async function fetchApplicants() {
        try {
          const res = await fetch('/api/rsvp_register_list', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ program_id: rsvp.post_id }),
          });
          if (!res.ok) throw new Error('Failed to fetch applicants');
          const data: Applicant[] = await res.json();
          setApplicants(data);
        } catch (error) {
          console.error('Error fetching applicants:', error);
        }
      }
      fetchApplicants();
    }, []);

    // Whenever applicants change, assign them into matching timeslots
    useEffect(() => {
      setTimeSlotsState(prev =>
        prev.map(ts => ({
          ...ts,
          applicants: applicants.filter(app => app.ts_id === ts.id),
        }))
      );
    }, [applicants]);

    //push applicant into rsvp.timeslot if timeslot.id is same with applicant.ts_id

    return (
        <div className="space-y-4">
            {timeSlotsState.map((timeSlot) => (
                <TimeSlotItem timeSlot={timeSlot} key={timeSlot.id} />
            ))}         
        </div>

        // <Table className='mb-4'>
        //     <TableHeader>
        //         <TableRow>
        //             <TableHead>Date</TableHead>
        //             <TableHead>Time</TableHead>
        //             <TableHead>Capacity</TableHead>
        //             <TableHead></TableHead>
        //         </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //         {timeSlots.map((timeSlot) => (
        //             <TableRow key={timeSlot.id}>
        //                 <TableCell>
        //                     {timeSlot.event_date.substring(2)}
        //                 </TableCell>
        //                 <TableCell>
        //                     {timeSlot.start_time.substring(0, 5)}-{timeSlot.end_time.substring(0, 5)}
        //                 </TableCell>
        //                 <TableCell>
        //                     {timeSlot.total_count} {timeSlot.companion === "1" && <Badge className="text-xs">Companion</Badge>}
        //                 </TableCell>
        //                 <TableCell>
        //                     <TimeSlotDeleteButton timeSlot={timeSlot}/>
        //                 </TableCell>
        //             </TableRow>
        //         ))}
        //     </TableBody>
        // </Table>
    )
}