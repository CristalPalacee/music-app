import { getSongById } from "@/api/route";

import Details from "./Details";
import { div } from "framer-motion/client";



export default async function DetailPage({ params, }: {params: Promise<{id: number}>}) {
  const song = await getSongById((await params).id);


  
  if (!song) {
    return (
      <div className=" bg-black flex items-center justify-center text-white">
        Data tidak ditemukan
      </div>
    );
  }
  return <Details song={song}  />
}