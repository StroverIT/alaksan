import { ButtonLink } from "@/components/Button";
import { CATALOG_PRODUCT_KIND } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { CONTENT, CTA_LABELS } from "./consts";
import type { TShopProductCardProps } from "./types";

export const ShopProductCard: FC<TShopProductCardProps> = ({ product }) => {
  const href = `/magazin/${product.slug}`;
  const ctaLabel = CTA_LABELS[product.kind] ?? CONTENT.defaultCtaLabel;
  const isUnavailable = product.kind === CATALOG_PRODUCT_KIND.UNAVAILABLE;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      {product.imagePath ? (
        <Link href={href} className="relative block aspect-16/10 shrink-0">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">
            <Link href={href} className="hover:text-accent">
              {product.name}
            </Link>
          </h2>
          {isUnavailable ? (
            <span className="shrink-0 rounded-lg bg-accent-muted/70 px-2 py-1 text-xs font-medium text-muted">
              {CONTENT.unavailableBadgeLabel}
            </span>
          ) : null}
        </div>
        {product.description ? (
          <p className="mt-2 line-clamp-3 text-sm text-muted">{product.description}</p>
        ) : null}
        <div className="mt-auto pt-4">
          <ButtonLink
            href={href}
            variant={isUnavailable ? "secondary" : "accent"}
            className="w-full"
          >
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
};
