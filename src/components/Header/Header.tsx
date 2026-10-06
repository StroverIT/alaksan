"use client";

import { useCart } from "@/components/CartProvider";
import { CONTENT as SITE_CONTENT, IMAGES, NAV_LINKS } from "@/consts";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { CONTENT } from "./consts";
import type { THeaderProps } from "./types";

export const Header: FC<THeaderProps> = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={IMAGES.logo}
            alt={SITE_CONTENT.siteNameLabel}
            width={44}
            height={44}
            className="h-11 w-11 rounded-lg object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-wide text-primary">
              {SITE_CONTENT.siteNameLabel}
            </p>
            <p className="text-xs text-muted">{SITE_CONTENT.siteTaglineLabel}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent-muted/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/kolichka"
          aria-label={CONTENT.cartAriaLabel}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition hover:border-accent/40"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M3.5 5h1.6l1.2 10.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L20 8.2H7.1" />
            <circle cx="9.2" cy="19.2" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="16.8" cy="19.2" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          {itemCount > 0 ? (
            <span className="font-tabular absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-primary-foreground">
              {itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
};
