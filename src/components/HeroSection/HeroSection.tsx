"use client";

import { CONTENT, IMAGES } from "@/consts";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, type FC } from "react";
import { ButtonLink } from "@/components/Button";

export const HeroSection: FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 32,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/80 to-primary/20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:py-40">
        <p
          data-hero-item
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent-muted"
        >
          {CONTENT.siteTaglineLabel}
        </p>
        <h1
          data-hero-item
          className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl"
        >
          {CONTENT.heroTitleLabel}
        </h1>
        <p data-hero-item className="mt-4 text-lg text-primary-foreground/90 md:text-xl">
          {CONTENT.heroSubtitleLabel}
        </p>
        <p
          data-hero-item
          className="mt-3 max-w-2xl text-sm text-primary-foreground/80 md:text-base"
        >
          {CONTENT.heroDescriptionLabel}
        </p>
        <div data-hero-item className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/porachka-po-razmer" variant="accent">
            {CONTENT.heroPrimaryCtaLabel}
          </ButtonLink>
          <ButtonLink href="/kolichka" variant="secondary">
            {CONTENT.heroSecondaryCtaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
