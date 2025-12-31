// src/app/components/aside/AsideItem.tsx
"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface AsideItemProps {
  title: string
  href: string
  icon: LucideIcon
  collapsed?: boolean
}

export default function AsideItem({
  title,
  href,
  icon: Icon,
  collapsed = false,
}: AsideItemProps) {
  return (
    <Link
      href={href}
      className="group flex justify-center items-center  gap-4 rounded-md p-2 
             hover:bg-blue-400/20 dark:hover:bg-gray-800 transition"
    >
      <Icon size={20} />
      {!collapsed && <span>{title}</span>}
    </Link>
  )
}
