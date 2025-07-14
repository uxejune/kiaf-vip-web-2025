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

interface Props {
    vips: Vip[];
    listType: VipListTypes;
    itemsPerPage: number;
    isAdmin?: boolean;
    userType?: UserTypes;
    isInviteAllowed?: boolean;
    galleryId?: string;
    partnerId?: string;
    vipDesk?: boolean;
}

export default function VipList({ vips, listType, itemsPerPage, isAdmin = false, userType = "admin", isInviteAllowed = true, galleryId, partnerId, vipDesk }: Props) {

    let sortedVip: Vip[] = [];
    if (Array.isArray(vips)) {
        sortedVip = [...vips].sort((a, b) => {
            // Assuming regdate is in ISO 8601 format, compare dates
            return new Date(b.regdate).getTime() - new Date(a.regdate).getTime();
        });
    }


    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Vip[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Vip[]>(sortedVip);
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
            vips.filter(
                vip =>
                    // vip.name.toLowerCase().includes(query) ||
                    vip.email.toLowerCase().includes(query)
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

    const handleWebTicketClick = (invitation_code: string) => {

        const encryptedId = encrypt(invitation_code);

        window.open(`../viptempticket?u=${encryptedId}`, '_blank');
    };

    const handleTicketAccessClick = (invitation_code: string) => {

        const encryptedId = encrypt(invitation_code);

        window.open(`../vipticket/information?u=${encryptedId}`, '_blank');
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);


    return (
        <>
            {/* {selectedData.map((vip) => (<div key={vip.email}>{vip.email} </div>))} */}
            {/* <div>user type is {userType}</div> */}
            <div className="flex max-md:flex-col max-md:gap-4 justify-between mb-4">
                <Input
                    className="max-w-64"
                    type="text"
                    placeholder="Search by email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />



                <div className="flex gap-2">
                    <CancelVipButton selectedVips={selectedData} />
                    {/* <Button disabled={ selectedData.length === 0 } variant="destructive">초대 취소</Button> */}
                    {listType == "gallery" ?
                        <InviteVipButton userType={userType} vipType={listType} isInviteAllowed={isInviteAllowed} galleryId={galleryId} />
                        :
                        <InviteVipButton userType={userType} vipType={listType} isInviteAllowed={isInviteAllowed} partnerId={partnerId} />
                    }

                </div>
            </div>
            <Table className='mb-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                onCheckedChange={(checked) => {
                                    handleHeaderCheckboxChange()
                                }}
                            />
                        </TableHead>
                        {/* <TableHead>아이디</TableHead> */}
                        <TableHead>이메일</TableHead>
                        <TableHead>전화번호</TableHead>
                        {isAdmin ? <TableHead>초대처</TableHead> : null}
                        <TableHead>Tier</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>동반인초대</TableHead>
                        {isAdmin ? <TableHead>Date Limit</TableHead> : null}
                        <TableHead></TableHead>
                        {/* {isAdmin ? <TableHead>Access</TableHead> : null}
                        {isAdmin ? <TableHead>임시티켓</TableHead> : null} */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayData.map((vip) => (
                        <TableRow key={vip.email}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedData.some(selectedVip => selectedVip.id === vip.id)}
                                    onCheckedChange={(checked) => {
                                        handleCheckboxChange(vip)
                                    }}
                                />
                            </TableCell>
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
                                <Badge  >{vip.vip_tier === "1" ? "Tier 1" : "Tier 2"}</Badge>
                            </TableCell>


                            <TableCell>
                                {<Badge variant="secondary">초대됨</Badge>}
                            </TableCell>

                            <TableCell>
                                {/* mobile parameter need to be fixed */}
                                {vip.guest_mobile || vip.guest_email ? <Badge variant="default">초대함</Badge> : <Badge variant="secondary">초대안함</Badge>}
                            </TableCell>

                            {isAdmin ?
                                <TableCell>
                                    {
                                        vip.date_limit == null ?
                                            <Badge variant={"secondary"}>None</Badge> :
                                            <Badge>{vip.date_limit}</Badge>
                                    }

                                </TableCell>
                                : null}

                            <TableHead>
                                <VipDetail vip={vip} />
                            </TableHead>

                            {/* {isAdmin ?
                                <TableCell>
                                    <Button size={"sm"} variant={"outline"} onClick={() => handleTicketAccessClick(vip.invitation_code)}>
                                        Move
                                    </Button>
                                </TableCell>
                                : null}

                            {isAdmin ?
                                <TableCell>
                                    <Button size={"sm"} variant={"outline"} onClick={() => handleWebTicketClick(vip.invitation_code)}>
                                        임시티켓
                                    </Button>
                                </TableCell>
                                : null} */}
                            {/* <TableCell>
                                <Button variant="outline" size="sm">More</Button>
                            </TableCell> */}
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
    );
}
