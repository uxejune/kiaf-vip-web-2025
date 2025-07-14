
'use client';
import { Partner } from "@/types/collections";
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
import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
// import QuotaSetButton from "./QuotaSetButton";
import { encrypt } from "@/lib/cryption";
import Image from "next/image";
import Link from "next/link";
import PartnerQuotaSetButton from "./PartnerQuotaSetButton";
import InviteVipButton from "../Vip/InviteVipButton";



interface Props {
    partners: Partner[];
    itemsPerPage: number;
}
export default function PartnerList({ partners, itemsPerPage }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Partner[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Partner[]>(partners);
    const [selectedData, setSelectedVips] = useState<Partner[]>([]);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const updateDisplayItems = useCallback(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredData.slice(offset, offset + itemsPerPage);
        setDisplayData(paginatedItems);
    }, [currentPage, filteredData, itemsPerPage]);

    useEffect(() => {
        updateDisplayItems();
    }, [currentPage, filteredData, updateDisplayItems]);

    // Initialize displayData when component mounts
    useEffect(() => {
        updateDisplayItems();
    }, [updateDisplayItems]);

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
            partners.filter(
                partners =>
                    partners.user_id.toLowerCase().includes(query)
            )
        );
    };

    const handleMoveClick = (postId: string) => {

        const encryptedId = encrypt(postId);
        window.location.href = `../partner?u=${encryptedId}`;

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

    return (
        <>
            <div className="flex justify-between mb-4">
                <Input
                    className="max-w-64"
                    type="text"
                    placeholder="Search by ID"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Allocation</TableHead>
                        <TableHead>Allocation Setting</TableHead>
                        <TableHead>partner page</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayData.map((partner) => (
                        <TableRow key={partner.user_id}>
                            <TableCell>
                                {partner.user_id}
                            </TableCell>
                            <TableCell>

                                {partner.nickname}

                            </TableCell>
                            
                            <TableCell>

                                {partner.quota? partner.quota: null }

                            </TableCell>

                            <TableCell>

                                <PartnerQuotaSetButton partnerId={partner.user_id} settedQuota={partner.quota} />

                            </TableCell>

                            <TableCell>

                                <Button asChild size={"sm"} variant={"outline"} >
                                    <Link  href={`../partner?p=${encrypt(partner.user_id)}`}>Move</Link>
                                </Button>

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
