"use client";


import { Spotlight } from "@/components/ui/spotlight";
import { TypewriterEffect } from "@/components/ui/typewriter";
import { motion } from "motion/react";

export function HeroSectionOne() {
  return (
    <div className=" h-screen w-full   flex items-center justify-center">
      <Spotlight />
      
      <div className="px-4 py-7 md:py-10">
        <h1 className="relative z-10 mx-auto  text-center text-3xl  font-bold text-slate-300 md:text-5xl lg:text-7xl dark:text-slate-300">
          {"Welcome to My Musik"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
                className="md:mr-7 mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
      
          <TypewriterEffect words={[
            {
            text: `" Selamat datang di Music Player by  Zagoours tempat setiap irama menemukan maknanya Biarkan musik mengalir menemani setiap detik Dari sunyi lahir harmoni "`,
      className: "text-slayer-500/70 dark:text-slate-400/70 italic",
            },
          ]} 
    className=" mt-6
    px-[15px]
    max-w-xs
    sm:max-w-md
    md:max-w-2xl
    md:p-2
    md:px-1
    leading-relaxed
    mx-auto
   " />
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Play Now
          </button>

        </motion.div>

      </div>
    </div>
  );
}


