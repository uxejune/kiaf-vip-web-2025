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
import ReinviteCanceledVipButton from './ReinviteCanceledVipButton';

interface Props {
    canceledVips: Vip[];
    itemsPerPage: number;
    isAdmin?: boolean;
    userType?: UserTypes;
    listType: VipListTypes;
}

export default function CanceledVipList({ canceledVips, itemsPerPage, isAdmin = false, userType = "admin", listType }: Props) {

    let sortedCanceledVip: Vip[] = [];
    if (Array.isArray(canceledVips)) {
        sortedCanceledVip = [...canceledVips].sort((a, b) => {
            // Assuming regdate is in ISO 8601 format, compare dates
            return new Date(b.regdate).getTime() - new Date(a.regdate).getTime();
        });
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Vip[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Vip[]>(sortedCanceledVip);
    const [selectedData, setSelectedVips] = useState<Vip[]>([]);

    const updateDisplayItems = () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredData.slice(offset, offset + itemsPerPage);
        setDisplayData(paginatedItems);
    };

    useEffect(() => {
        updateDisplayItems();
    }, [currentPage, filteredData]);

    // Initialize displayData when component mounts
    useEffect(() => {
        updateDisplayItems();
    }, []);

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
            canceledVips.filter(
                canceledVip =>
                    // vip.name.toLowerCase().includes(query) ||
                    canceledVip.email.toLowerCase().includes(query)
            )
        );
    };

    const handleCheckboxChange = (vip: Vip) => {

        if (selectedData.some(selectedVip => selectedVip.id === vip.id)) {

            setSelectedVips(selectedData.filter(selectedVip => selectedVip.id !== vip.id));
        } else {

            setSelectedVips([...selectedData, vip]);
        }
    };

    const handleHeaderCheckboxChange = () => {
        if (selectedData != displayData) {
            setSelectedVips(displayData)
        } else {
            setSelectedVips([])
        }
    }

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

        <>
            <div className="flex max-md:flex-col max-md:gap-4 justify-between mb-4">
                <Input
                    className="max-w-64"
                    type="text"
                    placeholder="Search by email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />



            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>

                        {/* <TableHead>
                            <Checkbox
                                onCheckedChange={(checked) => {
                                    handleHeaderCheckboxChange()
                                }}
                            />
                        </TableHead> */}

                        {/* <TableHead>아이디</TableHead> */}
                        <TableHead>이메일</TableHead>
                        <TableHead>전화번호</TableHead>
                        {isAdmin ? <TableHead>초대처</TableHead> : null}
                        <TableHead>Tier</TableHead>
                        <TableHead></TableHead>


                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayData.map((vip) => (
                        <TableRow key={vip.email}>
                            {/* <TableCell>
                                <Checkbox
                                    checked={selectedData.some(selectedVip => selectedVip.id === vip.id)}
                                    onCheckedChange={(checked) => {
                                        handleCheckboxChange(vip)
                                    }}
                                />
                            </TableCell> */}

                            {/* <TableCell>
                                {vip.id}
                            </TableCell> */}

                            <TableCell>
                                {userType == "admin" && (vip.gallery_title || vip.partner_title) ? "-" : vip.email}
                                {/* {userType=="gallery" ? vip.email : null}
                                {userType=="partner" ? vip.email : null} */}
                            </TableCell>
                            <TableCell>
                                {userType == "admin" && (vip.gallery_title || vip.partner_title) ? "-" : vip.mobile}
                                {/* {userType=="gallery" ? vip.mobile : null}
                                {userType=="partner" ? vip.mobile : null} */}

                            </TableCell>
                            {isAdmin && listType == "gallery" ?
                                <TableCell>
                                    {vip.gallery_title}
                                </TableCell>
                                : null}

                            {isAdmin && listType == "partner" ?
                                <TableCell>
                                    {vip.partner_title}
                                </TableCell>
                                : null}

                            <TableCell>
                                <Badge>{vip.vip_tier === "1" ? "Tier 1" : "Tier 2"}</Badge>
                            </TableCell>

                            <TableCell>
                                <ReinviteCanceledVipButton canceledVip={vip} />
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
        </>


    )
}