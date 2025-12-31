
// import Hero from "@/app/Home/Hero";
import Card from "@/app/Home/Card";
import { getSongs} from "@/api/route";
import  { HeroSectionOne } from "./Home/Hero";

export default async function Home() {

const songs = await getSongs();

  return (
<header className="min-h-screen w-full bg-neutral-900 dark:bg-neutral-800/80">
  <div className="container mx-auto  justify-center p-10 ">
  <HeroSectionOne  />
  <Card  title="Gambar" songs={songs} />
  </div>
</header>
  )
}
