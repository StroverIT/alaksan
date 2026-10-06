"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type FC } from "react";
import {
  DEFAULT_REVEAL_DURATION,
  DEFAULT_REVEAL_STAGGER,
  DEFAULT_REVEAL_Y,
} from "./consts";
import type { TGsapRevealProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

export const GsapReveal: FC<TGsapRevealProps> = ({
  children,
  className = "",
  delay = 0,
  stagger = DEFAULT_REVEAL_STAGGER,
  y = DEFAULT_REVEAL_Y,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const targets = root.querySelectorAll("[data-reveal-item]");
    const elements = targets.length > 0 ? targets : [root];

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        opacity: 0,
        y,
        duration: DEFAULT_REVEAL_DURATION,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [delay, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
