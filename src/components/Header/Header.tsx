"use client";

import { useCart } from "@/components/CartProvider";
import SiteIcon from "@/components/SiteIcon";
import { CONTENT as SITE_CONTENT, IMAGES, NAV_LINKS } from "@/consts";
import { COMPANY } from "@/lib/company";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FC } from "react";
import { CONTENT } from "./consts";
import type { THeaderProps } from "./types";

export const Header: FC<THeaderProps> = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const cartLabel =
    itemCount > 0
      ? `${CONTENT.cartAriaLabel}, ${itemCount}`
      : CONTENT.cartAriaLabel;

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={IMAGES.logo}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide text-primary">
              {SITE_CONTENT.siteNameLabel}
            </p>
            <p className="hidden truncate text-xs text-muted xl:block">
              {SITE_CONTENT.siteTaglineLabel}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={CONTENT.menuLabel}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
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

        <div className="flex items-center gap-2">
          <a
            href={COMPANY.phonePrimaryHref}
            className="hidden items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-primary hover:bg-accent-muted/50 xl:inline-flex"
          >
            <SiteIcon name="phone" className="h-4 w-4" />
            {COMPANY.phonePrimaryLabel}
          </a>

          <Link
            href="/kolichka"
            aria-label={cartLabel}
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

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground md:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? CONTENT.closeMenuLabel : CONTENT.openMenuLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <SiteIcon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      </div>

      {menuOpen ? (
        <div
          id="site-menu"
          className="fixed inset-x-0 bottom-0 top-17 z-40 overflow-y-auto border-t border-border bg-background md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label={CONTENT.menuLabel}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={COMPANY.phonePrimaryHref}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-3 text-base font-medium text-primary-foreground"
            >
              <SiteIcon name="phone" />
              {COMPANY.phonePrimaryLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
};
