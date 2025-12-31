
"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"
import AssideApp  from "./AssideApp"


export default function Asside() {
    const [open, setOpen ] = useState(false)
    const [collapsed, setCollapsed] = useState(true)
     return (
        <>
        
        <div className="md:hidden fixed flex items-center gap-2 overflow-auto bg-white dark:bg-gray-900 border-b">
         <button
         onClick={() => setOpen(true)}
         className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring"
         >
             <ChevronRight size={40}/>
         </button>
        </div>
       
          
        <AssideApp collapsed={collapsed} setCollapsed={setCollapsed}/>  
        </>

    )
}