'use client';
import { Gallery } from "@/types/collections";
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
import QuotaSetButton from "./QuotaSetButton";
import { encrypt } from "@/lib/cryption";
import BoothCodeSetButton from "./BoothCodeSetButton";
import BoothCodeDeleteButton from "./\bBoothCodeDeleteButton";



interface Props {
    galleries: Gallery[];
    itemsPerPage: number;
}


export default function GalleryList({ galleries, itemsPerPage }: Props) {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Gallery[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Gallery[]>(galleries);
    const [selectedData, setSelectedVips] = useState<Gallery[]>([]);
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
            galleries.filter(
                galleries =>
                    galleries.post_id.toLowerCase().includes(query) ||
                    galleries.title?.toLowerCase().includes(query) || 
                    galleries.boothCode?.toLowerCase().includes(query)
            )
        );
    };

    const handleMoveClick = (postId: string) => {

        const encryptedId = encrypt(postId);

        window.location.href = `../gallery?g=${encryptedId}`;
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
                    placeholder="Search by name and ID"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>VIP Allocation</TableHead>
                        <TableHead>Single Allocation</TableHead>
                        <TableHead>Allocation Setting</TableHead>
                        <TableHead>Gallery Page</TableHead>
                        <TableHead>Booth code</TableHead>
                        <TableHead>Booth code setting</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayData.map((gallery) => (
                        <TableRow key={gallery.post_id}>
                            <TableCell>
                                {gallery.post_id}
                            </TableCell>
                            <TableCell>
                                {gallery.title}
                            </TableCell>
                            <TableCell>
                                {
                                    gallery.payment == 'selected' ?
                                        <Badge variant="secondary">Approved</Badge>
                                        : <Badge variant="outline">Condition</Badge>
                                }

                            </TableCell>
                            <TableCell>
                                {gallery.quota ? gallery.quota : null}
                            </TableCell>
                            <TableCell>
                                {gallery.singleQuota ? gallery.singleQuota : null}
                            </TableCell>
                            <TableCell>
                                {/* <Button size={"sm"} variant={"outline"}>Set</Button> */}
                                <QuotaSetButton galleryName={gallery.title} galleryId={gallery.post_id} settedQuota={gallery.quota} settedSingleQuota={gallery.singleQuota} />
                            </TableCell>
                            <TableCell>
                                <Button size={"sm"} variant={"outline"} onClick={() => handleMoveClick(gallery.post_id)}>
                                    Move
                                </Button>
                                {/* move to /gallery?g=[gallery.post_id] */}
                            </TableCell>
                            <TableCell>
                                {gallery.boothCode ? gallery.boothCode : null}
                            </TableCell>
                            <TableCell className="flex gap-2" >
                                <BoothCodeSetButton galleryName={gallery.title} galleryId={gallery.post_id} settedBoothCode={gallery.boothCode} />
                                {gallery.boothCode && <BoothCodeDeleteButton galleryId={gallery.post_id} />}


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