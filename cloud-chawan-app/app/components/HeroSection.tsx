"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingClouds } from "./FloatingClouds";

const ritualItems = ["Wished for slow mornings", "Ceramic bowls in calm tones", "Seasonal matcha stories"];

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

  return (
    <main
      ref={containerRef}
      className="relative isolate min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,192,203,0.48),_transparent_40%),linear-gradient(135deg,_#FFFEFD_0%,_#F4F9EE_100%)] px-3 py-3 text-[#334155] sm:px-5 sm:py-5 lg:px-8 lg:py-8"
    >
      <section className="relative mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-6xl flex-col overflow-hidden rounded-[2.2rem] border border-[#EAEAEA]/80 bg-[#FCFCFA]/80 px-5 py-5 shadow-[0_24px_80px_rgba(51,65,85,0.08)] backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-10"><FloatingClouds />
        <header className="relative z-30 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <div className="flex items-center justify-center rounded-[2rem] border border-[#EAEAEA] bg-[#254231] px-4 py-4 shadow-[0_16px_32px_rgba(51,65,85,0.12)] sm:px-5 sm:py-5 lg:px-6 lg:py-6">
              <Image
                src="/logo/cloud-chawan-logo.png"
                alt="Cloud Chawan logo"
                width={320}
                height={320}
                priority
                className="h-auto w-full max-w-[14rem] object-contain sm:max-w-[16rem] lg:max-w-[18rem]"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-full border border-[#EAEAEA] bg-[#FFFEFD]/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.32em] text-[#334155]/70"
          >
            MATCHA • CALM • COLLECTED
          </motion.div>
        </header>

        <div className="relative z-20 flex flex-1 flex-col justify-center py-8 sm:py-12 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-16">
         

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="inline-flex rounded-full border border-[#EFC0CB] bg-[#FFFEFD]/90 px-3.25 py-1.5 text-sm font-medium text-[#334155]/70"
            >
              A quieter kind of ritual
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#334155] sm:text-5xl lg:text-[3.7rem]"
            >
              Find your dream
              <br />
              matcha set. ☁️
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24 }}
              className="mt-5 max-w-xl text-base leading-8 text-[#334155]/75 sm:text-lg"
            >
              If you missed a collection, join the Cloud Wishlist and we’ll notify you through Instagram when it’s restocked.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.a
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full bg-[#C5D9B8] px-6 py-3.5 text-sm font-semibold text-[#334155] shadow-[0_16px_36px_rgba(51,65,85,0.12)]"
              >
                Browse Matcha Sets
              </motion.a>
              <span className="text-sm text-[#334155]/60">
                Gentle restocks, thoughtfully shared.
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            style={{ y, opacity }}
            className="relative z-20 mt-10 w-full max-w-lg lg:mt-0"
          >
            <div className="rounded-[2rem] border border-[#EFC0CB]/80 bg-[#FFFEFD]/90 p-3 shadow-[0_24px_70px_rgba(51,65,85,0.09)] sm:p-4">
              <div className="rounded-[1.6rem] border border-[#EAEAEA] bg-[linear-gradient(135deg,_rgba(255,254,253,1),_rgba(197,217,184,0.72))] p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#334155]/60">
                  CLOUD RITUAL
                </p>
                <div className="mt-5 grid gap-3">
                  {ritualItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.1 }}
                      className="rounded-[1.2rem] border border-[#FFFEFD]/70 bg-[#FFFEFD]/85 px-4 py-3.5 text-sm text-[#334155]/80 shadow-[0_10px_24px_rgba(51,65,85,0.04)]"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
