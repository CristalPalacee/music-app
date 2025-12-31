"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
const parentRef = useRef<HTMLDivElement | null>(null);
const containerRef = useRef<HTMLDivElement | null>(null);

  const beams = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
    { initialX: 1000, translateX: 1000, duration: 4, repeatDelay: 2, className: "h-12" },
    { initialX: 1200, translateX: 1200, duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative bg-gradient-to-br  from-neutral-950 to-neutral-850 dark:to-neutral-800 dark:from-neutral-950 min-h-screen w-full overflow-hidden",
        className
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      {/* collision surface */}
      <div
        ref={containerRef}
        className="absolute bottom-20 md:bottom-7 bg-neutral-100 w-full inset pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34,42,53,.2), 0 2px 1px rgba(0,0,0,.05), 0 16px 68px rgba(47,48,55,.05)",
        }}
      />
    </div>
  );
};

const CollisionMechanism = ({
  containerRef,
  parentRef,
  beamOptions = {},
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  beamOptions?: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
}) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [beamKey, setBeamKey] = useState(0);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({ detected: false, coordinates: null });
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !locked
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          setCollision({
            detected: true,
            coordinates: {
              x: beamRect.left - parentRect.left + beamRect.width / 2,
              y: beamRect.bottom - parentRect.top,
            },
          });
          setLocked(true);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [locked, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setLocked(false);
        setBeamKey((k) => k + 1);
      }, 1500);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{
          translateY: beamOptions.initialY || "-250px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        animate={{
          translateY: beamOptions.translateY || "1600px",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        transition={{
          duration: beamOptions.duration || 8,
          ease: "linear",
          repeat: Infinity,
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className
        )}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            style={{
              left: collision.coordinates.x,
              top: collision.coordinates.y,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Explosion = ({
  style,
}: {
  style: React.CSSProperties;
}) => {
  const [particles, setParticles] = React.useState<
    {
      id: number;
      x: number;
      y: number;
      duration: number;
    }[]
  >([]);

  // generate random AFTER render (LEGAL)
  React.useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 - 40,
        y: Math.random() * -50 - 10,
        duration: Math.random() * 1.2 + 0.5,
      }))
    );
  }, []);

  return (
    <div
      style={{ ...style, transform: "translate(-50%, -50%)" }}
      className="pointer-events-none absolute z-50"
    >
      {/* flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute -inset-x-10 h-2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />

      {/* particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
