"use client";

import { Song } from "@/api/route";
import BackButtons from "./Back";
import Player from "./Player";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AOS from 'aos';
interface DetailsProps {
  song: Song;
}

export default function Details({ song }: DetailsProps) {
  const playlist: Song[] = [song]
  const router = useRouter();

// PREV SONG 
   const nextSong = () => {
    router.push(`/details/${song.id + 1}`);
  };

  const prevSong = () => {
    router.push(`/details/${song.id - 1}`);
  };
 

   useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out",
       offset: 200, 
    });

    AOS.refresh(); // ✅ WAJIB untuk App Router
  }, [song.id]); // ✅ supaya re-trigger saat ganti lagu

  return ( 
    <BackgroundBeamsWithCollision className="min-h-screen">
      {/* CONTENT */}
      <div  className="relative z-10 min-h-screen flex flex-col text-white">
        
        {/* KONTEN UTAMA */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <img
           data-aos="fade-down"
            data-aos-offset="600"
            src={song.cover}
            alt={song.title}
            className="w-64 md:w-96 object-cover aspect-square rounded-2xl shadow-xl"
          />

          <h1 className="mt-6 text-2xl font-bold">
            {song.title}
          </h1>

          <p className="mt-1 text-white/60">
            {song.artist}
          </p>

          <Player
        onNext={nextSong}
        onPrev={prevSong} 
        src={song.url}  />
        </div>

        {/* BACK BUTTON */}
        <div className="container mx-auto flex justify-center p-6">
          <BackButtons />
        </div>

      </div>
    </BackgroundBeamsWithCollision>
  );
}
