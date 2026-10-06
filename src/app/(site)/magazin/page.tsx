import ShopProductCard from "@/components/ShopProductCard";
import { prisma } from "@/lib/prisma";
import type { FC } from "react";

const ShopPage: FC = async () => {
  const products = await prisma.catalogProduct.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-primary">Магазин</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
