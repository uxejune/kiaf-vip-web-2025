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

import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { CreatedId } from '@/types/collections';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import DeleteAccountButton from './DeleteAccountButton';

interface Props {
    createdIds: CreatedId[];
    itemsPerPage: number;
}

export default function CreatedIdList({ createdIds, itemsPerPage }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<CreatedId[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<CreatedId[]>(createdIds);
    const [selectedData, setSelectedData] = useState<CreatedId[]>([]);


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
            createdIds.filter(
                createdId =>
                    createdId.name.toLowerCase().includes(query)
            )
        );
    };

    const handleCheckboxChange = (createdId: CreatedId) => {

        if (selectedData.some(selectedVip => selectedVip.id === createdId.id)) {
            // select one
            setSelectedData(selectedData.filter(selectedVip => selectedVip.id !== createdId.id));
        } else {
      
            setSelectedData([...selectedData, createdId]);
        }
    };

    const handleHeaderCheckboxChange = () => {
        if (selectedData != displayData) {
            setSelectedData(displayData)
        } else {
            setSelectedData([])
        }
    }

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
            <div className="flex justify-between mb-4">
                <Input
                    className="max-w-64"
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className="flex gap-2">


                    <DeleteAccountButton selectedAccounts={selectedData}/>
                    {/* <Button disabled={ selectedData.length === 0 } variant="destructive">계정삭제</Button> */}
                    <Button variant="outline" asChild>
                        <Link href={"../admin/create-vip-id/create-form"}>계정생성 초대</Link>    
                    </Button>
                </div>
            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                        </TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>VIP ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Partner</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayData.map((createdId) => (
                        <TableRow key={createdId.id}>
                            <TableCell>
                                <Checkbox
                                    // checked={selectedData.some(selectedVip => selectedVip.id === vip.id)}
                                    onCheckedChange={(checked) => {
                                        handleCheckboxChange(createdId)
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                {createdId.id}
                            </TableCell>
                            <TableCell>
                                {createdId.vip_id}
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
                                {createdId.partner_name}
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