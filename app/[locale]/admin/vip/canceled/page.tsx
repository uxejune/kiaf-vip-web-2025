import Aside from "@/components/General/Aside/Aside";
import { Button } from "@/components/ui/button";
import CanceledVipList from "@/components/Vip/CanceledVipList";
import VipList from "@/components/Vip/VipList";
import { checkUserAccount } from "@/utils/supabase/auth_actions";
import { MoveLeft, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { AdminVipInviteLog, DateLimitedVipInvitation, Vip } from "@/types/collections";

// Types to avoid `any` in CSV building
type CSVPrimitive = string | number | boolean | null | undefined | Date;
type CSVRow = Record<string, CSVPrimitive>;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("type", "gallery");

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

const cancelledVipList = async (): Promise<Vip[] | { data: Vip[] }> => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_cancellist", requestOptions);
        if (!res.ok) {
            console.error("vip_cancellist fetch failed:", res.status, res.statusText);
            return [] as Vip[];
        }
        const data = await res.json();
        return data as Vip[] | { data: Vip[] };

    } catch (err) {
        console.log(err);

        return [] as Vip[];
    }
};



// Build CSV (UTF-8) from an array of flat objects
function objectsToCSV(rows: CSVRow[]): string {
    if (!rows || rows.length === 0) return "";
    const columnsSet = rows.reduce<Set<string>>((set, row) => {
        Object.keys(row || {}).forEach((k) => set.add(k));
        return set;
    }, new Set<string>());
    const columns = Array.from(columnsSet);

    const escapeCell = (val: CSVPrimitive): string => {
        if (val === null || val === undefined) return "";
        const s = val instanceof Date ? val.toISOString() : String(val);
        const needsQuotes = /[",\n\r]/.test(s);
        const escaped = s.replace(/"/g, '""');
        return needsQuotes ? `"${escaped}"` : escaped;
    };

    const header = columns.map(escapeCell).join(",");
    const body = rows
        .map(row => columns.map(col => escapeCell(row?.[col])).join(","))
        .join("\r\n");

    return `${header}\r\n${body}`;
}

function hasDataArray(x: unknown): x is { data: Vip[] } {
    if (typeof x !== "object" || x === null) return false;
    if (!("data" in x)) return false;
    const maybe = x as { data: unknown };
    return Array.isArray(maybe.data);
}

const accessibleRoles = ["master", "admin", "guestDev", "agent"];

export default async function Page() {
    const user = await checkUserAccount();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible) {
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    const canceledVipListRaw = await cancelledVipList();
    // Normalize to array once and use consistently
    const canceledRows: Vip[] = Array.isArray(canceledVipListRaw)
        ? canceledVipListRaw
        : hasDataArray(canceledVipListRaw)
            ? canceledVipListRaw.data
            : [];


    // console.log("canceledVipListData", canceledVipListData);



    //fetching date limited VIP invitation list

    const supabase = await createClient();

    const { data: dateLimitedVipInvitation, error: errorDateLimitedVipInvitation } = await supabase
        .from("dateLimitedVipInvitation")
        .select("*");


    const { data: adminVipInviteLog, error: errorAdminVipInviteLog } = await supabase
        .from("adminVipInviteLog")
        .select("*");


    const dateLimitedVipInvitationData: DateLimitedVipInvitation[] = dateLimitedVipInvitation ?? [];

    const adminVipInviteLogData: AdminVipInviteLog[] = adminVipInviteLog ?? []

    // merge dateLimited info into vipListData by matching barcode with code
    canceledRows.forEach(vip => {
        const match = dateLimitedVipInvitationData.find(item => item.code === vip.invitation_code);
        if (match) {
            (vip as Vip).date_limit = match.date;
            (vip as Vip).is_one_day_ticket = match.is_one_day_ticket;
        }
    });

        // merge admin invite log info into vipListData by matching barcode with code
    canceledRows.forEach(vip => {
        const logMatch = adminVipInviteLogData.find(log => log.code === vip.invitation_code);
        if (logMatch) {
            (vip as Vip).invited_by = logMatch.account;
        }
    });



    const csvString = objectsToCSV(canceledRows as unknown as CSVRow[]);
    const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvString)}`;

    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const fileName = `canceled_vips_gallery_${y}${m}${d}.csv`;


    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>


            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!} />
                <div className="p-4 w-full space-y-4"  >
                    <div className="flex items-center gap-2">
                        <Button variant={"outline"} size={"icon"} asChild>
                            <Link href={"/admin/vip"}>
                                <MoveLeft />
                            </Link>
                        </Button>
                        <h2 className="heading-2 ">Cancelled VIPs</h2>
                    </div>

                    <Button variant={"outline"} asChild>
                        <a href={csvHref} download={fileName}>Download CSV</a>
                    </Button>

                    <CanceledVipList canceledVips={canceledRows} itemsPerPage={10} listType={"gallery"} isAdmin />
                </div>



            </div>
        </div>
    )
}