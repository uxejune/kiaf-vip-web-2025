'use client'

import { usePathname } from 'next/navigation'
import SignOut from "@/components/Auth/SignOut";
import {  PersonIcon, ImageIcon, PlayIcon, ViewGridIcon, BoxModelIcon, GearIcon } from "@radix-ui/react-icons";
import * as React from 'react';

import Link from "next/link";

interface AsideMenuItem {
    url: string;
    title: string;
    icon: React.FC;
    isActive?: boolean;
    role: string[];
}

export default function Aside({ userEmail, userRole }: { userEmail: string, userRole: string }) {

    const pathName = usePathname();

    // Extract the path without locale
    const pathWithoutLocale = pathName.replace(/^\/[a-z]{2}\//, '/');

    const menuItems: AsideMenuItem[] = [];

    menuItems.push(
        { url: '/admin/setting', title: 'Setting', icon: GearIcon, role: ["master", "admin"] },
        { url: '/admin/vip', title: 'VIP', icon: ViewGridIcon, role: ["master", "admin", "guestDev", "agent"] },
        // { url: '/admin/partnervip', title: 'Partner VIP', icon: PersonIcon, role: ["master", "admin","agent"] },
        // { url: '/admin/docent', title: 'Admin Docent', icon: ImageIcon, role: ["master", "admin"] },
        // { url: '/admin/docent-generate', title: 'Docent Generate', icon: ImageIcon, role: ["master"] },
        { url: '/admin/rsvp', title: 'RSVP', icon: PlayIcon, role: ["master", "admin"] },
        // { url: '/admin/gallery', title: 'Galleries', icon: BoxModelIcon, role: ["master", "admin"] },
        // { url: '/admin/partner', title: 'Partners', icon: BoxModelIcon, role: ["master", "admin"] },
        // { url: '/admin/create-vip-id', title: 'ID Createad Partner VIP', icon: BoxModelIcon, role: ["master"] },
        // { url: '/admin/vip-desk', title: 'VIP Desk', icon: BoxModelIcon, role: ["master","admin","agent"] },
    )

    const updatedMenuItems = menuItems.map(item => ({
        ...item,
        isActive: pathWithoutLocale.startsWith(item.url) &&
            (pathWithoutLocale === item.url || pathWithoutLocale[item.url.length] === '/' || pathWithoutLocale[item.url.length] === undefined)
    }));

    return (
        <div className="flex flex-col border-r w-60">
            {/* <p>{userRole}</p> */}
            <div className="flex-1 p-3">
                {updatedMenuItems.map(menuItem => (

                    menuItem.role.includes(userRole) ?
                        <Link key={menuItem.url} href={menuItem.url}>
                            <div className={`flex items-center gap-4 text-lg font-medium transition-colors hover:text-foreground/80 hover:bg-foreground/10 sm:text-sm p-2 rounded ${menuItem.isActive ? 'bg-foreground text-background' : ''}`}>
                                <menuItem.icon /> {menuItem.title}
                            </div>
                        </Link>
                        : null


                ))}
            </div>
            <div className="flex items-center pl-5 pr-2 py-2 border-t">
                <small className="flex-1">{userEmail}</small>
                <SignOut />
            </div>
        </div>
    )
}
