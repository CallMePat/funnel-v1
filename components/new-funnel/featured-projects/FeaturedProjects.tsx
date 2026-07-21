"use client";

import { useLayoutEffect, useRef } from "react";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Image from "next/image";

type FeaturedProjectsContent = DictShape["newFunnel"]["featuredProjects"];
type RevealState = "hidden" | "animating" | "revealed";

interface StripBounds {
  lower: number;
  upperGap: number;
  delay: number;
}

interface MaskInterval {
  top: number;
  bottom: number;
}

interface SlideLayer {
  transitionIndex: number;
  img: HTMLImageElement;
  setScale: (value: number) => void;
  revealState: RevealState;
}

interface FeaturedProjectsProps {
  content: FeaturedProjectsContent;
}

const STRIPS_COUNT = 20;
const SCROLL_PER_TRANSITION = 1000;
const INITIAL_DELAY = 300;
const FINAL_DELAY = 300;
const TITLE_CHANGE_THRESHOLD = 0.3;

const MASK_HIDDEN =
  "linear-gradient(to bottom, transparent 0%, transparent 100%)";
const MASK_REVEALED = "linear-gradient(to bottom, black 0%, black 100%)";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function createStripBounds(stripsCount: number): StripBounds[] {
  return Array.from({ length: stripsCount }, (_, index) => {
    const posFromBottom = stripsCount - index - 1;
    const step = 100 / stripsCount;
    const lower = (posFromBottom + 1) * step;
    const upper = posFromBottom * step;

    return {
      lower,
      upperGap: upper - 0.1,
      delay: (index / stripsCount) * 0.5,
    };
  });
}

function mergeIntervals(intervals: MaskInterval[]) {
  if (!intervals.length) return [];

  intervals.sort((a, b) => a.top - b.top);
  const merged = [{ ...intervals[0] }];

  for (let index = 1; index < intervals.length; index++) {
    const last = merged[merged.length - 1];
    const next = intervals[index];

    if (next.top <= last.bottom) {
      last.bottom = Math.max(last.bottom, next.bottom);
      continue;
    }

    merged.push({ ...next });
  }

  return merged;
}

function buildStripMask(
  stripBounds: StripBounds[],
  getAdjustedProgress: (index: number, bounds: StripBounds) => number,
) {
  const intervals: MaskInterval[] = [];

  for (let index = 0; index < stripBounds.length; index++) {
    const bounds = stripBounds[index];
    const adjustedProgress = clamp(getAdjustedProgress(index, bounds), 0, 1);

    if (adjustedProgress <= 0) continue;

    const sliceHeight = bounds.lower - bounds.upperGap;
    intervals.push({
      top: bounds.lower - adjustedProgress * sliceHeight,
      bottom: bounds.lower,
    });
  }

  const merged = mergeIntervals(intervals);

  if (!merged.length) return MASK_HIDDEN;

  const stops: string[] = [];
  let cursor = 0;

  for (const { top, bottom } of merged) {
    if (top > cursor) {
      stops.push(`transparent ${cursor}%`, `transparent ${top}%`);
    }

    stops.push(`black ${top}%`, `black ${bottom}%`);
    cursor = bottom;
  }

  if (cursor < 100) {
    stops.push(`transparent ${cursor}%`, "transparent 100%");
  }

  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

function setMaskImage(element: HTMLImageElement, value: string) {
  element.style.maskImage = value;
  element.style.webkitMaskImage = value;
}

function createScaleSetter(element: HTMLImageElement) {
  const apply = (value: number) => {
    element.style.transform = `translate3d(0, 0, 0) scale(${value})`;
  };

  apply(1.25);
  return apply;
}

export default function FeaturedProjects({ content }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const exploreLinkRef = useRef<HTMLAnchorElement>(null);
  const slideImageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    const titleNode = titleRef.current;
    const exploreLinkNode = exploreLinkRef.current;
    const firstImageNode = firstImageRef.current;
    const slideImages = slideImageRefs.current.slice(0, content.slides.length - 1);

    if (
      !sectionElement ||
      !titleNode ||
      !exploreLinkNode ||
      !firstImageNode ||
      slideImages.length !== content.slides.length - 1 ||
      slideImages.some((image) => !image)
    ) {
      return;
    }

    const section = sectionElement;
    const titleElement = titleNode;
    const exploreLink = exploreLinkNode;
    const firstImage = firstImageNode;

    const stripBounds = createStripBounds(STRIPS_COUNT);
    const totalSlides = content.slides.length;
    const setFirstImageScale = createScaleSetter(firstImage);
    const slideLayers: SlideLayer[] = slideImages.map((image, index) => {
      const layerImage = image as HTMLImageElement;
      setMaskImage(layerImage, MASK_HIDDEN);

      return {
        transitionIndex: index,
        img: layerImage,
        setScale: createScaleSetter(layerImage),
        revealState: "hidden",
      };
    });

    const transitionCount = totalSlides - 1;
    const totalScrollDistance =
      transitionCount * SCROLL_PER_TRANSITION + INITIAL_DELAY + FINAL_DELAY;

    const transitionRanges: { startPercent: number; endPercent: number }[] = [];
    let position = INITIAL_DELAY;

    for (let index = 0; index < transitionCount; index++) {
      const start = position;
      const end = start + SCROLL_PER_TRANSITION;

      transitionRanges.push({
        startPercent: start / totalScrollDistance,
        endPercent: end / totalScrollDistance,
      });

      position = end;
    }

    function calculateImageProgress(scrollProgress: number) {
      if (scrollProgress < transitionRanges[0].startPercent) return 0;

      if (
        scrollProgress >
        transitionRanges[transitionRanges.length - 1].endPercent
      ) {
        return transitionRanges.length;
      }

      for (let index = 0; index < transitionRanges.length; index++) {
        const { startPercent, endPercent } = transitionRanges[index];

        if (scrollProgress >= startPercent && scrollProgress <= endPercent) {
          const normalizedProgress =
            (scrollProgress - startPercent) / (endPercent - startPercent);

          return index + normalizedProgress;
        }
      }

      return transitionRanges.length;
    }

    function getScaleForImage(
      imageIndex: number,
      currentImageIndex: number,
      progress: number,
    ) {
      const continuousProgress = currentImageIndex + progress;
      const diff = continuousProgress - imageIndex;

      if (diff <= 0) return 1.25;
      if (diff >= 2) return 1;

      return 1.25 - 0.125 * diff;
    }

    function getTitleIndexForProgress(imageProgress: number) {
      const index = Math.floor(imageProgress);
      const specificProgress = imageProgress - index;

      return specificProgress >= TITLE_CHANGE_THRESHOLD
        ? Math.min(index + 1, content.slides.length - 1)
        : index;
    }

    function setLayerRevealed(layer: SlideLayer) {
      if (layer.revealState === "revealed") return;
      setMaskImage(layer.img, MASK_REVEALED);
      layer.revealState = "revealed";
    }

    function setLayerHidden(layer: SlideLayer) {
      if (layer.revealState === "hidden") return;
      setMaskImage(layer.img, MASK_HIDDEN);
      layer.revealState = "hidden";
    }

    let currentTitleIndex = 0;
    let queuedTitleIndex: number | null = null;
    let isAnimating = false;
    let lastImageProgress = 0;
    let frame = 0;

    titleElement.textContent = content.slides[0].title;
    exploreLink.href = content.slides[0].url;

    function animateTitleChange(index: number, direction: "up" | "down") {
      if (index === currentTitleIndex) return;
      if (index < 0 || index >= content.slides.length) return;

      if (isAnimating) {
        queuedTitleIndex = index;
        return;
      }

      isAnimating = true;

      const outY = direction === "down" ? "-120%" : "120%";
      const inY = direction === "down" ? "120%" : "-120%";

      exploreLink.href = content.slides[index].url;

      const outAnimation = titleElement.animate(
        [
          { transform: "translateY(0%)" },
          { transform: `translateY(${outY})` },
        ],
        {
          duration: 300,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );

      outAnimation.onfinish = () => {
        titleElement.textContent = content.slides[index].title;
        titleElement.style.transform = `translateY(${inY})`;

        const inAnimation = titleElement.animate(
          [
            { transform: `translateY(${inY})` },
            { transform: "translateY(0%)" },
          ],
          {
            duration: 300,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        );

        inAnimation.onfinish = () => {
          titleElement.style.transform = "translateY(0%)";
          currentTitleIndex = index;
          isAnimating = false;

          if (
            queuedTitleIndex !== null &&
            queuedTitleIndex !== currentTitleIndex
          ) {
            const nextIndex = queuedTitleIndex;
            queuedTitleIndex = null;
            animateTitleChange(nextIndex, direction);
          }
        };
      };
    }

    function update() {
      frame = 0;

      const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
      const scrolled = clamp(-section.getBoundingClientRect().top, 0, maxScroll);
      const scrollProgress = scrolled / maxScroll;
      const imageProgress = calculateImageProgress(scrollProgress);
      const scrollDirection =
        imageProgress > lastImageProgress ? "down" : "up";
      const currentImageIndex = Math.floor(imageProgress);
      const imageSpecificProgress = imageProgress - currentImageIndex;

      const correctTitleIndex = getTitleIndexForProgress(imageProgress);

      if (correctTitleIndex !== currentTitleIndex) {
        queuedTitleIndex = correctTitleIndex;

        if (!isAnimating) {
          animateTitleChange(correctTitleIndex, scrollDirection);
        }
      }

      setFirstImageScale(
        getScaleForImage(0, currentImageIndex, imageSpecificProgress),
      );

      for (const layer of slideLayers) {
        const { transitionIndex, setScale } = layer;

        setScale(
          getScaleForImage(
            transitionIndex,
            currentImageIndex,
            imageSpecificProgress,
          ),
        );

        if (transitionIndex < currentImageIndex) {
          setLayerRevealed(layer);
        } else if (transitionIndex === currentImageIndex) {
          layer.revealState = "animating";
          setMaskImage(
            layer.img,
            buildStripMask(stripBounds, (_index, bounds) =>
              clamp((imageSpecificProgress - bounds.delay) * 2, 0, 1),
            ),
          );
        } else {
          setLayerHidden(layer);
        }
      }

      lastImageProgress = imageProgress;
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [content]);

  const totalScrollDistance =
    (content.slides.length - 1) * SCROLL_PER_TRANSITION +
    INITIAL_DELAY +
    FINAL_DELAY;

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `calc(100svh + ${totalScrollDistance}vh)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#111110] font-sans">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              ref={firstImageRef}
              src={content.slides[0].image}
              alt={content.slides[0].title}
              fill
              sizes="100vw"
              className="h-full w-full origin-center object-cover transition-transform duration-100 ease-out [backface-visibility:hidden]"
            />
          </div>

          {content.slides.slice(1).map((slide, index) => (
            <div
              key={`${slide.title}-${index}`}
              className="absolute inset-0 [backface-visibility:hidden] [transform:translateZ(0)]"
            >
              <Image
                ref={(element) => {
                  slideImageRefs.current[index] = element;
                }}
                src={slide.image}
                alt={slide.title}
                fill
                sizes="80vw"
                decoding="async"
                className="h-full w-full origin-center object-cover transition-transform duration-100 ease-out [backface-visibility:hidden] [will-change:transform,mask-image]"
                style={{
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 border-b border-white/20">
          <div className="flex gap-8 px-5 sm:px-8 lg:px-9">
            <div className="hidden flex-1 max-[1000px]:hidden lg:block">
              <p className="m-0 text-4xl font-medium leading-none tracking-[-0.02rem] text-white">
                {content.prefix}
              </p>
            </div>

            <div className="relative h-[22px] flex-1 overflow-hidden sm:h-[40px] lg:flex-[2]">
              <p
                ref={titleRef}
                className="m-0 text-lg font-medium leading-none tracking-[-0.02rem] text-white [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] sm:text-4xl"
              >
                {content.slides[0].title}
              </p>
            </div>

            <div className="flex flex-1 justify-end">
              <a
                ref={exploreLinkRef}
                href={content.slides[0].url}
                className="text-lg font-medium leading-none tracking-[-0.02rem] text-white no-underline sm:text-4xl"
              >
                {content.explore}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
