import ConfiguratorForm from "@/components/ConfiguratorForm";
import MattressCoverForm from "@/components/MattressCoverForm";
import PillowForm from "@/components/PillowForm";
import ProductUnavailable from "@/components/ProductUnavailable";
import SoundInsulationProduct from "@/components/SoundInsulationProduct";
import { SHOP_CONTENT } from "@/consts";
import { CATALOG_PRODUCT_KIND } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";

type TProductPageProps = {
  params: Promise<{ slug: string }>;
};

const ProductPage: FC<TProductPageProps> = async ({ params }) => {
  const { slug } = await params;

  const product = await prisma.catalogProduct.findFirst({
    where: { slug, active: true },
  });

  if (!product) {
    notFound();
  }

  if (product.kind === CATALOG_PRODUCT_KIND.INFO_PAGE) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <SoundInsulationProduct productName={product.name} />
      </div>
    );
  }

  const foamTypes =
    product.kind === CATALOG_PRODUCT_KIND.FOAM_CONFIGURATOR
      ? await prisma.foamType.findMany({
          where: { active: true },
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        })
      : [];

  const pillowTypes =
    product.kind === CATALOG_PRODUCT_KIND.PILLOW_CONFIGURATOR
      ? await prisma.pillowType.findMany({
          where: { active: true },
          orderBy: { sortOrder: "asc" },
          select: { id: true, name: true },
        })
      : [];

  const pillowSizes =
    product.kind === CATALOG_PRODUCT_KIND.PILLOW_CONFIGURATOR
      ? await prisma.pillowSize.findMany({
          where: { active: true },
          orderBy: { sortOrder: "asc" },
          select: { id: true, label: true, widthCm: true, lengthCm: true },
        })
      : [];

  const pillowPrices =
    product.kind === CATALOG_PRODUCT_KIND.PILLOW_CONFIGURATOR
      ? await prisma.pillowPrice.findMany({
          select: {
            pillowTypeId: true,
            pillowSizeId: true,
            priceEur: true,
          },
        })
      : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <nav aria-label={SHOP_CONTENT.breadcrumbLabel} className="text-sm text-muted">
        <Link href="/magazin" className="font-medium text-primary hover:text-accent">
          {SHOP_CONTENT.breadcrumbLabel}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{product.name}</span>
      </nav>

      <div
        className={`mt-6 grid items-start gap-8 ${product.imagePath ? "lg:grid-cols-2 lg:gap-12" : ""}`}
      >
        {product.imagePath ? (
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface lg:sticky lg:top-24">
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        ) : null}

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {product.name}
          </h1>
          {product.description ? (
            <p className="mt-4 text-base leading-relaxed text-muted">{product.description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-10">
        {product.kind === CATALOG_PRODUCT_KIND.FOAM_CONFIGURATOR ? (
          <ConfiguratorForm foamTypes={foamTypes} embedded />
        ) : null}
        {product.kind === CATALOG_PRODUCT_KIND.DIMENSIONS ? (
          <MattressCoverForm
            catalogProductId={product.id}
            productName={product.name}
            pricePerM2={product.pricePerM2}
          />
        ) : null}
        {product.kind === CATALOG_PRODUCT_KIND.PILLOW_CONFIGURATOR ? (
          <PillowForm
            catalogProductId={product.id}
            productName={product.name}
            pillowTypes={pillowTypes}
            pillowSizes={pillowSizes}
            pillowPrices={pillowPrices}
          />
        ) : null}
        {product.kind === CATALOG_PRODUCT_KIND.UNAVAILABLE ? (
          <ProductUnavailable />
        ) : null}
      </div>
    </div>
  );
};

export default ProductPage;
