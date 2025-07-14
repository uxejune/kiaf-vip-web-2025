'use client';
import { PersonIcon, ImageIcon, PlayIcon, PlusIcon, ExitIcon, ViewGridIcon } from "@radix-ui/react-icons";

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
import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import AddDocentButton from "../Docent/AddDocentButton";
import DocentPlayer from "../Docent/DocentPlayer";
import DocentOpenButton from "../Docent/DocentOpenButton";
import DescButton from "../Docent/DescButton";
import { Artwork } from "@/types/collections";




interface Props {
    artworks: Artwork[];
    itemsPerPage: number;
    boothCodes?: string;
}

function extractFirstImageUrl(jsonString: string | null) {

    if (jsonString) {
        try {
            // Parse the JSON string
            const data = JSON.parse(jsonString);

            // Check if data is an array and has at least one element
            if (Array.isArray(data) && data.length > 0) {
                // Extract the URL from the first element
                const firstImage = data[0];
                if (firstImage && typeof firstImage.url === 'string') {
                    return firstImage.url;
                }
            }
        } catch (error) {
            console.error("Failed to parse JSON string:", error);
        }
    }

    // Return null if no URL is found
    return null;
}

export default function ArtworkList({ artworks, itemsPerPage, boothCodes }: Props) {


    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Artwork[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Artwork[]>(artworks);
    const [selectedData, setSelectedData] = useState<Artwork[]>([]);

    const updatedisplayData = useCallback(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredData.slice(offset, offset + itemsPerPage);
        setDisplayData(paginatedItems);
    }, [currentPage, filteredData, itemsPerPage]);

    useEffect(() => {
        updatedisplayData();
    }, [currentPage, filteredData, updatedisplayData]);



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
            artworks.filter(
                artwork =>
                    artwork.title.toLowerCase().includes(query) ||
                    artwork.artist_name.toLowerCase().includes(query) ||
                    artwork.gallery_title?.toLowerCase().includes(query) ||
                    artwork.boothCode?.toLowerCase().includes(query)
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

    return (
        <>
            <div className="flex justify-between mb-4">
                <Input
                    className="max-w-64"
                    type="text"
                    placeholder="Search by title and booth code"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>작품</TableHead>
                        <TableHead>아티스트</TableHead>
                        <TableHead>국문 도슨트</TableHead>
                        <TableHead>국문 desc</TableHead>
                        <TableHead>영문 도슨트</TableHead>
                        <TableHead>영문 desc</TableHead>
                        <TableHead>도슨트 공개 여부</TableHead>
                        <TableHead>도슨트 공개 설정</TableHead>
                        <TableHead>전시관</TableHead>
                        <TableHead>Booth Code</TableHead>
                    </TableRow>
                </TableHeader>
                {displayData.map((artwork) => (
                    <TableRow key={artwork.id}>
                        <TableCell className='flex items-center gap-2'>
                            <Image alt={'artwork image'} src={extractFirstImageUrl(artwork.detail_images) || '/missing.png'} width={64} height={64} style={{ width: 64, height: 64 }} />
                            <p>{artwork.title}{artwork.year ? ', ' : null}{artwork.year}</p>
                        </TableCell>
                        <TableCell>{artwork.artist_name}</TableCell>
                        <TableCell>{
                            artwork.ko_url ? <DocentPlayer docentUrl={artwork.ko_url} docentText={artwork.desc_en!} artworkId={artwork.id} langCode="ko" /> : <AddDocentButton artworkId={artwork.id} language="ko" />
                        }</TableCell>
                        <TableCell>
                            {artwork.desc_en !== null && artwork.desc_en.trim() !== '' ?  <DescButton artworkId={artwork.id} decs={artwork.desc_en} language="ko" /> : null}
                        </TableCell>
                        <TableCell>{artwork.en_url ? <DocentPlayer docentUrl={artwork.en_url} docentText={artwork.desc_ko!} artworkId={artwork.id} langCode="ko"  /> : <AddDocentButton artworkId={artwork.id} language="en" />}</TableCell>
                        <TableCell>
                            {artwork.desc_ko !== null && artwork.desc_ko.trim() !== '' ? <DescButton artworkId={artwork.id}  decs={artwork.desc_ko} language="en" />: null}
                        </TableCell>
                        <TableCell>
                       
                            {artwork.status == '1' ? <Badge variant={"secondary"}>Open</Badge> : <Badge variant={"default"}>Close</Badge>  }
                        </TableCell>
                            
                        <TableCell>
                            <DocentOpenButton artworkId={artwork.id} isOpen={artwork.status == "1" ? true : false }  />
                        </TableCell>

                        <TableCell>{artwork.gallery_title}</TableCell>
                        <TableCell>{artwork.boothCode && artwork.boothCode}</TableCell>
                    </TableRow>

                ))}



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