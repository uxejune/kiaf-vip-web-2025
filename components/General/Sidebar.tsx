"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, Cog, Users, UsersRound,Image,Play  ,  Settings, FileText, BarChart3, LogOutIcon, ChevronUp } from "lucide-react"
import { logout } from "@/utils/supabase/auth_actions"
import Link from "next/link"

const menuItems = [
  { url: '/admin/setting', title: 'Setting', icon: Cog, role: ["master", "admin"] },
  { url: '/admin/vip', title: 'VIP', icon: Users, role: ["master", "admin", "guestDev", "agent"] },
  { url: '/admin/partnervip', title: 'Partner VIP', icon: UsersRound, role: ["master", "admin", "agent"] },
  { url: '/admin/docent', title: 'Admin Docent', icon: Image, role: ["master", "admin"] },
  { url: '/admin/docent-generate', title: 'Docent Generate', icon: Image, role: ["master"] },
  { url: '/admin/rsvp', title: 'RSVP', icon: Play, role: ["master", "admin"] },
  { url: '/admin/gallery', title: 'Galleries', icon: FileText, role: ["master", "admin"] },
  { url: '/admin/partner', title: 'Partners', icon: FileText, role: ["master", "admin"] },
  { url: '/admin/create-vip-id', title: 'ID Createad Partner VIP', icon: FileText, role: ["master"] },
  { url: '/admin/vip-desk', title: 'VIP Desk', icon: FileText, role: ["master", "admin", "agent"] },
]

interface SidebarProps {
  activeHref?: string;
  userEmail: string;
  userRole: string;
}

export default function Sidebar({ activeHref, userEmail, userRole }: SidebarProps) {
  // const userEmail = "john.doe@example.com"


  const handleLogout = () => {
    // console.log("Logging out...")
    logout();
    // Handle logout logic here
  }

  return (
    <aside className="flex h-screen w-48 flex-col bg-gray-50 border-r border-gray-200">
      {/* Header */}
      <div className="flex h-14 items-center justify-center border-b border-gray-200 ">
        <h1 className="text-xl font-bold text-gray-900">Kiaf VIP Admin</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 px-2 py-2">
        {menuItems.map((item) => {

          

          const Icon = item.icon
          const isActive = activeHref != null && item.url?.includes(activeHref ?? "");
          return (
            item.role.includes(userRole) ?
            <Button
              key={item.title}
              variant="ghost"
              className={`w-full justify-start gap-3 px-3 py-2 ${isActive
                ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              asChild
            >
              <Link href={item.url}>
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>

            </Button>
            : null
          )
        })}
      </nav>

      {/* User Account Section */}
      <div className="border-t border-gray-200 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-2 py-2 h-auto hover:bg-gray-100">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gray-500 text-white text-sm">
                    {userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700 truncate">{userEmail}</span>
              </div>
              <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
