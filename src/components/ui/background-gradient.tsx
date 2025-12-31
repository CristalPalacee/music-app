"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {

const variants = {
    initial: {
      backgroundPosition: "0 10%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl p-[2px] overflow-hidden",
        containerClassName
      )}
    >
      {/* ===== ROTATING BORDER CORE ===== */}
      <motion.div
        initial={{ rotate: 0 }}
        
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }
      }  
      style={{ backgroundSize: animate ? "400% 400%" : "auto" }}
       className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-10 group-hover:opacity-10 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        initial={{ rotate: 0 }}
        
        animate={{ rotate: -360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }
      }  
      style={{ backgroundSize: animate ? "400% 400%" : "auto" }}
       className={cn(
          "absolute inset-0 rounded-2xl z-[1] opacity-90 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      

   
      {/* ===== CARD BODY ===== */}
      <div
        className={cn(
          "relative z-10 rounded-2xl bg-zinc-900",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
