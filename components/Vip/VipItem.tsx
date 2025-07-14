"use client"    

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vip } from "@/types/collections";

interface ComponentProps {
    vip:Vip,
    onClickFunction: () => void;
}

export default function VipItem({vip,onClickFunction}:ComponentProps){




    return(
        <TableRow key={vip.id}>
        <TableCell>
            <Checkbox

            />
        </TableCell>
        <TableCell>
            {vip.id}
        </TableCell>
        <TableCell>
            {vip.email}
        </TableCell>
        <TableCell>
            {vip.mobile}
        </TableCell>
        <TableCell>
            {vip.gallery_title}
        </TableCell>
        <TableCell>
            {vip.enter_status ? <Badge variant="default">수령</Badge> : <Badge variant="secondary">초대됨</Badge>}
        </TableCell>
        <TableCell>
            {vip.enter_date ? <Badge variant="default">초대함</Badge> : <Badge variant="secondary">초대안함</Badge>}
        </TableCell>
        <TableCell>
            {/* <Button onClick={onClickFunction} variant="outline" size="sm">More</Button> */}
            <button onClick={onClickFunction}>Click me</button>
        </TableCell>
    </TableRow>
    )
}