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
    listType: VipListTypes;
    itemsPerPage: number;
    isAdmin?: boolean;
    userType?: UserTypes;
    isInviteAllowed?: boolean;
    galleryId?: string;
    partnerId?: string;
    vipDesk?: boolean;
    userEmail?: string;

    allocation?: number;
    invited?: number;
    singleAllocation?: number;
    singleInvited?: number;
}

export default function VipList({ vips, listType, itemsPerPage, isAdmin = false, userType = "admin", isInviteAllowed = true, galleryId, partnerId, vipDesk, userEmail, allocation, invited, singleAllocation, singleInvited }: Props) {

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
        const lower = (searchQuery || '').toLowerCase();
        const byQuery = vips.filter(
            vip => vip.email.toLowerCase().includes(lower) ||
                vip.barcode.toLowerCase().includes(lower)
        );

        const byLimit = isDayLimetedSelected
            ? byQuery.filter(
                vip => (
                    (vip.date_limit != null && String(vip.date_limit).trim() !== '') ||
                    vip.is_one_day_ticket === true
                )
            )
            : byQuery;

        const sorted = isDayLimetedSelected
            ? [...byLimit].sort((a, b) => {
                const dateA = a.date_limit ? new Date(a.date_limit).getTime() : Infinity;
                const dateB = b.date_limit ? new Date(b.date_limit).getTime() : Infinity;
                return dateA - dateB;
            })
            : byLimit;

        setFilteredData(sorted);
    }, [searchQuery, isDayLimetedSelected, vips]);

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
                <div className="flex gap-4">

                    <Input
                        className="w-64"
                        type="text"
                        placeholder="Search by email"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />


                    {userType == "admin" &&
                        <div className="flex items-center gap-1 shrink-0">
                            <Checkbox
                                id="dayLimetedFilter"
                                checked={!!isDayLimetedSelected}
                                onCheckedChange={(checked) => {
                                    setIsDayLimetedSelected(!!checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <Label htmlFor="terms">Date Limited Only</Label>
                        </div>
                    }
                </div>

                <div className="flex gap-2">
                    <CancelVipButton selectedVips={selectedData}/>

                    {/* {galleryId ?
                        <CancelVipButton selectedVips={selectedData} userType={userType} galleryId={galleryId} />
                        : <CancelVipButton selectedVips={selectedData} userType={userType} />
                    } */}


                    {/* <Button disabled={ selectedData.length === 0 } variant="destructive">초대 취소</Button> */}



                    {listType == "gallery" ?
                        <InviteVipButton
                            userType={userType}
                            vipType={listType}
                            isInviteAllowed={isInviteAllowed}
                            galleryId={galleryId}
                            userEmail={userEmail}

                            allocation={allocation}
                            invited={invited}
                            singleAllocation={singleAllocation}
                            singleInvited={singleInvited}

                        />
                        :
                        <InviteVipButton
                            userType={userType}
                            vipType={listType}
                            isInviteAllowed={isInviteAllowed}
                            partnerId={partnerId}
                        />
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
                        <TableHead>Type</TableHead>
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
                                {vip.email}
                                {/* {userType == "admin" && (vip.gallery_title || vip.partner_title) ? "-" : vip.email} */}

                            </TableCell>
                            <TableCell>

                                {vip.mobile}
                                {/* {userType == "admin" && (vip.gallery_title || vip.partner_title) ? "-" : vip.mobile} */}


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
                                <Badge  >{vip.vip_tier === "1" ? "Normal" : "Single"}</Badge>
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
                                            vip.is_one_day_ticket ?
                                                <div>
                                                    <Badge variant={"secondary"}>One Day</Badge>
                                                    {vip.enter_date && <p>vip.enter_date</p>}
                                                </div> :
                                                <Badge variant={"secondary"}>None</Badge> :

                                            <Badge>{vip.date_limit}</Badge>

                                    }


                                </TableCell>
                                : null}

                            <TableCell>
                                <VipDetail vip={vip} isAdmin={isAdmin} listType={listType} />
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
    );
}
