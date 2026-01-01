
"use client"

import React from 'react'
import { getSongs, Song } from "@/api/route";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from '@/components/ui/background-gradient';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { cardItem } from '@/components/ui/AnimateSrol';



interface CardProps {
    songs: Song[]
    title: string




}
export default function Card({ songs, title }: CardProps) {
     const router = useRouter();
    return (
  
        <div className='grid grid-cols-1  md:grid-cols-3 justify-center px-3 gap-16'>
            {songs.map((song, index) => (
         <motion.div
          key={song.id}
          variants={cardItem(index)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
                <Link href={`/details/${song.id}`}
                className='mb-3 cursor-pointer group md:w-100 rounded-2xl transition
                              hover:shadow-xl'>
                <BackgroundGradient className='p-4 rounded-2xl sm:p-6 bg-zinc-900 dark:bg-zinc-900'>
                    <div className=' overflow-hidden w-full rounded-xl'>
                        <img
                            className='h-full aspect-square w-full rounded-2xl object-cover transition
                            group-hover:scale-105'
                            src={song.cover} alt={title} />
                        <div className='p-2 md:p-3 gap-2 flex-col flex'>
                            <h1 className='text-xl font-semibold text-white'>{song.title}</h1>
                            <p className='text-sm text-white/70'>{song.artist}</p>
                        </div>
                    </div>
                </BackgroundGradient>
               
                </Link>
                 </motion.div>
            ))}
        </div>
         
    );
}