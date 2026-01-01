"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Update SVG height (important)
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Gradient movement
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
   
  );

const y2 = useTransform(
  scrollYProgress,
  [0, 1],
  [200, svgHeight + 200]
);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative  w-full md:min-h-screen px-5 md:px-16 overflow-hidden",
        className
      )}
    >
      {/* Beam */}
      <div className="absolute ml-auto -right-26 md:left-[-17px] pr-20">
        {/* Dot */}
        <motion.div
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0,0,0,0.25) 0px 3px 8px",
          }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 bg-white"
        >
          <motion.div
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "#fff" : "#10b981",
              borderColor:
                scrollYProgress.get() > 0 ? "#fff" : "#059669",
            }}
            className="h-2 w-2 rounded-full border"
          />
        </motion.div>

        {/* SVG Line */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Base line */}
          <path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.15"
          />

          {/* Animated gradient line */}
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2.78"
            className="motion-reduce:hidden"
          />

          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="20%" stopColor="#18CCFC" />
              <stop offset="50%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </motion.div>
  );
};
