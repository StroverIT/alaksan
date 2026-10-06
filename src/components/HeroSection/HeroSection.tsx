"use client";

import { ButtonLink } from "@/components/Button";
import SiteIcon from "@/components/SiteIcon";
import { CONTENT, HERO_TRUST, IMAGES } from "@/consts";
import { gsap } from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef, type FC } from "react";

export const HeroSection: FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = [...root.querySelectorAll<HTMLElement>("[data-hero-item]")];

    if (reducedMotion) {
      items.forEach((item) => item.setAttribute("data-revealed", ""));
      gsap.set(items, { clearProps: "opacity,transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 32, force3D: true });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        onComplete: () => {
          items.forEach((item) => item.setAttribute("data-revealed", ""));
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/88 to-primary/25" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:py-36">
        <p
          data-hero-item
          className="text-sm font-medium uppercase tracking-[0.18em] text-accent-muted"
        >
          {CONTENT.siteTaglineLabel}
        </p>
        <h1
          data-hero-item
          className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-6xl"
        >
          {CONTENT.heroTitleLabel}
        </h1>
        <p
          data-hero-item
          className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg"
        >
          {CONTENT.heroDescriptionLabel}
        </p>
        <div data-hero-item className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/porachka-po-razmer" variant="accent">
            {CONTENT.heroPrimaryCtaLabel}
          </ButtonLink>
          <ButtonLink href="/kontakti" variant="secondary">
            {CONTENT.heroSecondaryCtaLabel}
          </ButtonLink>
        </div>
        <ul data-hero-item className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {HERO_TRUST.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/85"
            >
              <SiteIcon name={item.icon} className="h-4 w-4 text-accent-muted" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
