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

interface TimeSlotWithApplicants extends TimeSlot {
  applicants: Applicant[];
}

export default function TimeSlotList({ rsvp }: Props) {
    const { timeSlots: rawTimeSlots, post_id } = rsvp;
    const timeSlots = rawTimeSlots ?? [];

    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [timeSlotsState, setTimeSlotsState] = useState<TimeSlotWithApplicants[]>(
      timeSlots.map(ts => ({ ...ts, applicants: [] }))
    );

    useEffect(() => {
      async function fetchApplicants() {
        try {
          const res = await fetch('/api/rsvp_register_list', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ program_id: post_id }),
          });
          if (!res.ok) throw new Error('Failed to fetch applicants');
          const data: Applicant[] = await res.json();
          setApplicants(data);
        } catch (error) {
          console.error('Error fetching applicants:', error);
        }
      }
      fetchApplicants();
    }, [post_id]);

    useEffect(() => {
      setTimeSlotsState(prev =>
        prev.map(ts => ({
          ...ts,
          applicants: applicants.filter(app => app.ts_id === ts.id),
        }))
      );
    }, [applicants]);

    if (timeSlots.length === 0) {
        return <p>no time slots</p>;
    }

    return (
        <div className="space-y-4">
            {timeSlotsState.map((timeSlot) => (
                <TimeSlotItem timeSlot={timeSlot} key={timeSlot.id} />
            ))}         
        </div>
    )
}