"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { vipInvite } from '@/lib/api';
import { setAdminVipIviteLog } from '@/utils/supabase/clientActions';

interface Row {
    email: string;
    phone: string;
    tier: string;
    complete: boolean | null;
    message?: string;
}

export default function BulkInvite() {
    const [tableData, setTableData] = useState<Row[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const parseCSV = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;
            const lines = text.trim().split('\n').map(line => line.split(','));
            const rawHeaders = lines.shift() || [];
            const headers = rawHeaders.map(h => h.trim().toLowerCase());
            const emailIdx = headers.indexOf('email');
            const phoneIdx = headers.indexOf('phone');
            const tierIdx = headers.indexOf('tier');
            const rows: Row[] = lines.map(cols => ({
                email: emailIdx >= 0 ? String(cols[emailIdx] ?? '').trim() : '',
                phone: phoneIdx >= 0 ? String(cols[phoneIdx] ?? '').trim() : '',
                tier: tierIdx >= 0 ? String(cols[tierIdx] ?? '').trim() : '',
                complete: null
            }));
            setTableData(rows);
        };
        reader.readAsText(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (!file.name.toLowerCase().endsWith('.csv')) {
                alert('CSV 파일만 업로드 가능합니다.');
                return;
            }
            parseCSV(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files?.[0] || null;
        if (dropped) {
            if (!dropped.name.toLowerCase().endsWith('.csv')) {
                alert('CSV 파일만 업로드 가능합니다.');
                return;
            }
            parseCSV(dropped);
        }
    };

    const handleInvite = async () => {
        setIsLoading(true);
        for (let index = 0; index < tableData.length; index++) {
            const row = tableData[index];
            const tierParam: "1" | "2" | undefined =
                row.tier === "1" || row.tier === "2" ? (row.tier as "1" | "2") : undefined;
            try {
                const res = await vipInvite(row.email, row.phone, tierParam);
                if (res.message === "402") {


                    setTableData(prev =>
                        prev.map((r, i) =>
                            i === index ? { ...r, message: `Error ${res.message}`, complete: false } : r
                        )
                    );
                } else {

                    await setAdminVipIviteLog(res.invitation_code, 'dev@artifacts.art');

                    setTableData(prev =>
                        prev.map((r, i) =>
                            i === index ? { ...r, complete: true } : r
                        )
                    );
                }
            } catch (error) {
                setTableData(prev =>
                    prev.map((r, i) =>
                        i === index
                            ? { ...r, message: `Exception`, complete: false }
                            : r
                    )
                );
            }
        }
        setIsLoading(false);
    };

    return (
        <div className='space-y-4'>
            <div
                className="border-2 border-dashed p-4 text-center cursor-pointer rounded"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("banner-file-input")?.click()}
            >
                <p className="text-neutral-500 text-sm">
                    Drag & Drop csv file here or click to select
                </p>
                <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="banner-file-input"
                    onChange={handleFileChange}
                />
            </div>



            {tableData.length > 0 && (

                <>

                    <Button disabled={isLoading} onClick={handleInvite}>{isLoading ? "loading..." : `Invite ${tableData.length}`}</Button>

                    <Table>
                        <TableCaption>A list of uploaded VIP list.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Tier</TableHead>
                                <TableHead>Complete</TableHead>
                                <TableHead>Message</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="border px-2 py-1">{row.email}</TableCell>
                                    <TableCell className="border px-2 py-1">{row.phone}</TableCell>
                                    <TableCell className="border px-2 py-1">{row.tier}</TableCell>
                                    <TableCell className="border px-2 py-1">
                                        {row.complete === true ? "✅" : row.complete === false ? "❌" : "⏹️"}
                                    </TableCell>
                                    <TableCell className="border px-2 py-1">{row.message}</TableCell>
                                </TableRow>
                            ))}


                        </TableBody>

                    </Table>


                </>
            )}
        </div>
    );
}