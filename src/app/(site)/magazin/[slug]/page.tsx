import ConfiguratorForm from "@/components/ConfiguratorForm";
import MattressCoverForm from "@/components/MattressCoverForm";
import ProductUnavailable from "@/components/ProductUnavailable";
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

  const foamTypes =
    product.kind === CATALOG_PRODUCT_KIND.FOAM_CONFIGURATOR
      ? await prisma.foamType.findMany({
          where: { active: true },
          orderBy: { name: "asc" },
        })
      : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <p className="text-sm text-muted">
        <Link href="/magazin" className="underline-offset-2 hover:underline">
          Магазин
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{product.name}</span>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {product.imagePath ? (
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-surface">
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
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          {product.description ? (
            <p className="mt-3 text-muted">{product.description}</p>
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
