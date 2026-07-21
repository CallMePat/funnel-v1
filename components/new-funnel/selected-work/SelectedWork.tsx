"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import type { DictShape } from "@/app/i18n/dictionaries/fr";

type SelectedWorkContent = DictShape["newFunnel"]["selectedWork"];
type Project = SelectedWorkContent["projects"][number];

interface SelectedWorkProps {
  content: SelectedWorkContent;
}

function LinkArrow({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center gap-6 border-b border-neutral-400 pb-2 font-mono text-[12px] uppercase tracking-[2.5px] text-neutral-700 no-underline transition-colors hover:border-neutral-900 hover:text-neutral-900"
    >
      {label}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

function ProjectCard({ project, explore }: { project: Project; explore: string }) {
  return (
    <article className="flex w-[86vw] shrink-0 flex-col gap-6 sm:w-[62vw] lg:w-[46vw]">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 46vw, 86vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="m-0 text-2xl font-medium tracking-[-0.01em] text-neutral-900 sm:text-3xl">
            {project.name}
          </h3>
          <p className="m-0 max-w-md text-[15px] leading-snug text-neutral-500">
            {project.description}
          </p>
        </div>
        <LinkArrow label={explore} href={project.url} />
      </div>
    </article>
  );
}

export default function SelectedWork({ content }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("200svh");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Match the vertical scroll budget to the horizontal travel so the sticky
  // section releases as soon as the last card arrives instead of feeling stuck.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const nextDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      const nextHeight = Math.max(window.innerHeight * 2, window.innerHeight + nextDistance);

      setDistance(nextDistance);
      setSectionHeight(`${nextHeight}px`);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [content.projects.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-neutral-100 font-sans"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* trionn-style centre marker */}
        {/* <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-full w-px -translate-x-1/2 bg-neutral-300/50" /> */}
        {/* <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-6 z-10 -translate-x-1/2 text-lg text-neutral-400"
        >
          +
        </span>
 */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-12 pr-5 pl-5 will-change-transform sm:gap-16 sm:pr-8 sm:pl-8 lg:gap-24 lg:pr-10 lg:pl-10"
        >
          {/* Intro panel */}
          <div className="flex w-[86vw] shrink-0 flex-col justify-center gap-10 sm:w-[52vw] lg:w-[42vw]">
            <h2 className="m-0 text-5xl font-medium leading-[1.02] tracking-[-0.03em] text-neutral-800 sm:text-6xl lg:text-8xl">
              {content.heading}
            </h2>
            <LinkArrow label={content.viewAll} />
          </div>

          {content.projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              explore={content.explore}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
