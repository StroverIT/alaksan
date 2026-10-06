"use client";

import { IMAGES } from "@/consts";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { ADMIN_CONTENT, ADMIN_NAV } from "./consts";

export const AdminAside: FC = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-border bg-surface p-5 shadow-sm md:w-64 md:border-b-0 md:border-r md:min-h-screen">
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <Image
          src={IMAGES.logo}
          alt={ADMIN_CONTENT.brandLabel}
          width={40}
          height={40}
          className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
        />
        <div>
          <p className="text-sm font-semibold text-primary">{ADMIN_CONTENT.brandLabel}</p>
          <p className="text-xs font-medium text-muted">{ADMIN_CONTENT.panelTitleLabel}</p>
        </div>
      </div>

      <nav className="mt-5 flex flex-row gap-2 md:flex-col md:gap-1">
        {ADMIN_NAV.map((item) => {
          const active =
            item.href === "/"
              ? false
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-accent-muted/50 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border pt-5">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-left text-sm font-medium text-foreground transition hover:border-accent/50 hover:text-accent"
        >
          {ADMIN_CONTENT.signOutLabel}
        </button>
      </div>
    </aside>
  );
};
