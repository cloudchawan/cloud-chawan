"use client";

import { motion } from "framer-motion";

const clouds = [
  {
    id: 1,
    className: "left-[-2rem] top-6 h-24 w-40 sm:left-[-1rem] sm:h-28 sm:w-44 lg:left-2 lg:top-10",
    delay: 0,
    duration: 10,
  },
  {
    id: 2,
    className: "right-[-1rem] top-24 h-20 w-32 sm:right-2 sm:h-24 sm:w-36 lg:right-10 lg:top-24",
    delay: 0.8,
    duration: 12,
  },
  {
    id: 3,
    className: "left-10 bottom-8 h-16 w-24 sm:left-20 sm:h-20 sm:w-28 lg:left-24 lg:bottom-12",
    delay: 1.4,
    duration: 14,
  },
  {
    id: 4,
    className: "right-20 bottom-4 h-14 w-20 sm:right-24 sm:h-16 sm:w-24 lg:right-28 lg:bottom-8",
    delay: 2.1,
    duration: 11,
  },
];

export function FloatingClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className={`absolute rounded-full bg-[#FFFFFF] shadow-[0_20px_50px_rgba(51,65,85,0.12)] ${cloud.className}`}
          animate={{ y: [0, -14, 0], x: [0, 7, 0], opacity: [0.75, 0.95, 0.75] }}
          transition={{
            duration: cloud.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: cloud.delay,
          }}
        />
      ))}
    </div>
  );
}
