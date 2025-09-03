'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Vip, VipListTypes } from '@/types/collections';
import { UserTypes } from "@/types/collections";
import InviteVipButton from './InviteVipButton';
import CancelVipButton from './CancelVipButton';
import { encrypt } from "@/lib/cryption";
import DeskCreateVIPAccountButton from './DeskCreateVIPAccountButton';
import VipDetail from './VipDetail';
import { Label } from '../ui/label';

interface Props {
    vips: Vip[];
    itemsPerPage: number;
}

export default function GuestList({ vips, itemsPerPage }: Props) {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Vip[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Vip[]>(vips);
    const [selectedData, setSelectedVips] = useState<Vip[]>([]);
    const [isDayLimetedSelected, setIsDayLimetedSelected] = useState<boolean>(false);

    const updateDisplayItems = () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredData.slice(offset, offset + itemsPerPage);
        setDisplayData(paginatedItems);
    };

    useEffect(() => {
        updateDisplayItems();
    }, [currentPage, filteredData]);

    useEffect(() => {
        const lower = (searchQuery ?? '').toLowerCase().trim();
        const queryDigits = lower.replace(/\D/g, ''); // extract only numbers from the query

        const byQuery = vips.filter(vip => {
            const email = (vip.guest_email ?? '').toLowerCase();
            const mobileDigits = (vip.guest_mobile ?? '').replace(/\D/g, ''); // keep only numbers

            const emailMatch = email.includes(lower); // if lower is '', this is true (no filtering)
            const mobileMatch = queryDigits ? mobileDigits.includes(queryDigits) : false;

            return emailMatch || mobileMatch;
        });

        setFilteredData(byQuery);
    }, [searchQuery, isDayLimetedSelected, vips]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);
    };

    //pagenation rendering
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

    return (
        <div>
            <div className="flex max-md:flex-col max-md:gap-4 justify-between mb-4">
                <div className="flex gap-4">

                    <Input
                        className="w-80"
                        type="text"
                        placeholder="Search by guest email or phone"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>이메일</TableHead>
                        <TableHead>전화번호</TableHead>
                        <TableHead>초대한 VIP Email</TableHead>
                        <TableHead>상태</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayData.map((vip) => (
                        <TableRow key={vip.email}>
                            <TableCell>{vip.guest_email}</TableCell>
                            <TableCell>{vip.guest_mobile}</TableCell>
                            <TableCell>{vip.email}</TableCell>
                            <TableCell>{vip.guest_enter_status == "1" ? <><Badge >입장함</Badge> {vip.guest_enter_date}</> : <Badge variant={"outline"}>입장안함</Badge>} </TableCell>

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
        </div>
    )
}