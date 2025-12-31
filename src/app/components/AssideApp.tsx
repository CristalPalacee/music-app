// src/app/components/aside/AssideApp.tsx
"use client"

import { ChevronLeft,ChevronRight } from "lucide-react"
import { ASIDE_ITEMS } from "./Data"
import AsideItem from "./AsideItem"
import { Dispatch, SetStateAction } from "react"
import { pre } from "framer-motion/client"

interface AssideAppProps {
collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

export default function AssideApp({ collapsed, setCollapsed }: AssideAppProps) {
  return (
    <aside
      className={`flex flex-col  left-0 h-full fixed z-60 bg-black/30 backdrop-blur dark:bg-gray-900  dark:border-gray-800 transition-all duration-600 ease-in-out
        ${collapsed ? "w-20" : "md:w-50 w-45"}
        overflow-hidden`}
    > 
      {/* Header */}
      <div className="flex items-center text-center  justify-center p-4">
        {!collapsed && <span className="font-extrabold flex justify-center ml-auto text-blue-300 text-lg">My Musik</span>}
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((prev => !prev))}
          className="p-2 ml-auto rounded-md text-white hover:bg-black/20 dark:hover:bg-gray-800 focus:outline-none "
        >
           {collapsed ? <ChevronRight size={18} strokeWidth={3} /> : <ChevronLeft size={18} strokeWidth={3}  />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-4  text-white p-3 font-semibold overflow-auto px-5">
        {ASIDE_ITEMS.map((item) => (
          <AsideItem
            collapsed={collapsed}
            key={item.title}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  )
}
