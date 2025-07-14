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
import RsvpDetailButton from "./RsvpDetailButton";


interface Props {
    rsvps: Rsvp[];
    itemsPerPage: number;
}

export default function RsvpList({ rsvps, itemsPerPage }: Props) {


    const visibleRsvps = rsvps.filter(rsvp => rsvp.hide === '0');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Rsvp[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Rsvp[]>(visibleRsvps);
    const [selectedData, setSelectedData] = useState<Rsvp[]>([]);

    const updatedisplayData = () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredData.slice(offset, offset + itemsPerPage);
        setDisplayData(paginatedItems);
    };

    useEffect(() => {
        updatedisplayData();
    }, [currentPage, filteredData]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);
        setFilteredData(
            visibleRsvps.filter(
                rsvp =>
                    rsvp.post_title.toLowerCase().includes(query)
            )
        );
    };

    const renderPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => handlePageChange(i)} isActive={i === currentPage}>{i}</PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink href="#" onClick={() => handlePageChange(1)} isActive={1 === currentPage}>1</PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 4) {
                pages.push(<PaginationEllipsis key="ellipsis-start" />);
            }

            const startPage = Math.max(2, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => handlePageChange(i)} isActive={i === currentPage}>{i}</PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 3) {
                pages.push(<PaginationEllipsis key="ellipsis-end" />);
            }

            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink href="#" onClick={() => handlePageChange(totalPages)} isActive={totalPages === currentPage}>{totalPages}</PaginationLink>
                </PaginationItem>
            );
        }
        return pages;
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (<>



        <Table className='mb-4 border rounded'>
            <TableHeader>
                <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayData.map((rsvp) => (
                    <TableRow key={rsvp.post_id}>
                        <TableCell>
                            {rsvp.post_title}
                        </TableCell>

                        <TableCell>
                            {rsvp.is_main == "1" ?
                                <div className="flex gap-2 items-center">
                                    <Badge variant="secondary">Main</Badge>
                                    <p className="text-xs">
                                        {rsvp.applicants == null ? 0 : rsvp.applicants?.length} / {rsvp.total_count} Applicants
                                    </p>

                                </div>

                                :
                                <div className="flex gap-2 items-center">
                                    <Badge variant="default">Time Slot</Badge>
                                    <p className="text-xs">
                                        {rsvp.timeSlots?.length} Slots
                                    </p>
                                </div>

                            }
                        </TableCell>
                        <TableCell>

                            <RsvpDetailButton rsvp={rsvp} />

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>

        <Pagination>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}>
                Previous
            </PaginationPrevious>
            <PaginationContent>
                {renderPageNumbers()}
            </PaginationContent>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}>
                Next
            </PaginationNext>
        </Pagination>
    </>)
}