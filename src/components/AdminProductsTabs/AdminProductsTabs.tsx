import Link from "next/link";
import type { FC } from "react";
import { PRODUCT_TABS } from "./consts";
import type { TAdminProductsTabsProps } from "./types";

export const AdminProductsTabs: FC<TAdminProductsTabsProps> = ({ activeTab }) => {
  return (
    <nav
      aria-label="Продуктови категории"
      className="mt-6 flex flex-wrap gap-2 border-b border-admin-border pb-px"
    >
      {PRODUCT_TABS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`-mb-px rounded-t-lg border px-4 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "border-admin-border border-b-background bg-admin-surface text-primary"
                : "border-transparent text-muted hover:border-admin-border/60 hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};
