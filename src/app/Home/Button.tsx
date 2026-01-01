"use client";

import { useEffect, useRef, useState } from "react";
import { getSongs, Song } from "@/api/route"; // ⬅️ PASTIKAN INI BENAR
import { aside } from "framer-motion/client";

export function PlayRandomButton() {
const [isLoading, setIsLoading] = useState(false);
const handleFollowIG = async () => {
    setIsLoading(true);


    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ganti 'zagoours' dengan username IG asli kamu
    const instagramUrl = "https://www.instagram.com";
    
    // '_blank' artinya membuka di tab baru
    window.open(instagramUrl, "_blank");
    setIsLoading(false);
  };

  return (
    <>
    

      <button
        onClick={handleFollowIG}
        disabled={isLoading} // Matikan tombol saat loading
        className="w-60 rounded-lg flex gap-2 items-center justify-center bg-black px-6 py-2 font-medium text-white
        transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed
        dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        {isLoading ? (
        <>
          {/* Icon Spinner (Loading) */}
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Membuka IG...</span>
        </>
      ) : (
        <>
          {/* Icon Play / IG (Normal) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
             <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
             <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
             <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>Follow Instagram</span>
        </>
      )}
      </button>

  
    </>
  );
}
