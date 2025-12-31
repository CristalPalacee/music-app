"use client";

import { useEffect, useRef, useState } from "react";

interface PlayerProps {
  src: string;
  onNext: () => void;
  onPrev: () => void;
}

export default function Player({ src, onNext, onPrev }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const shouldAutoPlay = useRef(false);


  // 🔁 RELOAD AUDIO SAAT SRC BERUBAH
 useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;

  if (shouldAutoPlay.current) {
    audio.play().catch(() => {});
    shouldAutoPlay.current = false;
  }
}, [src]);

  // 🎧 EVENT LISTENER
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);

  audio.addEventListener("play", onPlay);
  audio.addEventListener("pause", onPause);

  return () => {
    audio.removeEventListener("play", onPlay);
    audio.removeEventListener("pause", onPause);
  };
}, []);


const toggle = async () => {
  if (!audioRef.current) return;

  if (playing) {
    audioRef.current.pause();

  } else {
    try {
      await audioRef.current.play();
  
    } catch (err) {
      console.warn("Play blocked by browser");
    }
  }
};

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(e.target.value);
  };

  const format = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-8 w-full max-w-md rounded-xl bg-zinc-900/30 p-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={current}
        onChange={seek}
        className="w-full accent-green-500"
      />

      <div className="mt-1 flex justify-between text-xs text-white/60">
        <span>{format(current)}</span>
        <span>{format(duration)}</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        {/* PREV */}
        <button  
    onClick={() => {
    shouldAutoPlay.current = true;
    onPrev();
  }} >
          <svg width="26" viewBox="0 0 24 24" fill="white">
            <path d="M6 4v16h2V4H6zm3.5 8L18 20V4L9.5 12z" />
          </svg>
        </button>

        {/* PLAY */}
      <button
          onClick={toggle}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-green-500 transition hover:scale-105 active:scale-95"
        >
          <svg
            viewBox="0 0 60 60"
            className="h-7 w-7 fill-black"
          >
            {/* PLAY */}
            <polygon
              points="22,18 22,42 42,30"
              className={`origin-center transition-all duration-300 ease-in-out
                ${playing ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
            />

            {/* PAUSE */}
            <g
              className={`origin-center transition-all duration-300 ease-in-out
                ${playing ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            >
              <rect x="20" y="18" width="6" height="24" rx="2" />
              <rect x="34" y="18" width="6" height="24" rx="2" />
            </g>
          </svg>
        </button>

        {/* NEXT */}
        <button 
         onClick={() => {
        shouldAutoPlay.current = true;
        onNext();
  }}
        >
          <svg width="26" viewBox="0 0 24 24" fill="white">
            <path d="M16 4v16h2V4h-2zM6 4v16l8.5-8L6 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
