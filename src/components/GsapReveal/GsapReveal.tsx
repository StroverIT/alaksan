"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type FC } from "react";
import {
  DEFAULT_REVEAL_DURATION,
  DEFAULT_REVEAL_STAGGER,
  DEFAULT_REVEAL_Y,
} from "./consts";
import type { TGsapRevealProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

const markRevealed = (elements: Element[]) => {
  elements.forEach((element) => {
    element.setAttribute("data-revealed", "");
  });
};

const animateReveal = (
  elements: Element[],
  {
    delay,
    duration,
    stagger,
    y,
  }: {
    delay: number;
    duration: number;
    stagger: number;
    y: number;
  },
) => {
  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: "power2.out",
    overwrite: true,
    onComplete: () => {
      markRevealed(elements);
    },
  });
};

export const GsapReveal: FC<TGsapRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = DEFAULT_REVEAL_DURATION,
  stagger = DEFAULT_REVEAL_STAGGER,
  y = DEFAULT_REVEAL_Y,
  group = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const elements = targets.length > 0 ? [...targets] : [root];

    if (reducedMotion) {
      markRevealed(elements);
      gsap.set(elements, { clearProps: "opacity,transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(elements, { opacity: 0, y, force3D: true });

      const revealOptions = { delay, duration, stagger, y };

      if (group) {
        ScrollTrigger.create({
          trigger: root,
          start: "top 85%",
          once: true,
          onEnter: () => {
            animateReveal(elements, revealOptions);
          },
        });
      } else {
        ScrollTrigger.batch(elements, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            animateReveal(batch, revealOptions);
          },
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
  }, [delay, duration, group, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
