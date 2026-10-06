import ConfiguratorForm from "@/components/ConfiguratorForm";
import { prisma } from "@/lib/prisma";
import type { FC } from "react";

const ConfiguratorPage: FC = async () => {
  const foamTypes = await prisma.foamType.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <ConfiguratorForm foamTypes={foamTypes} />
    </div>
  );
};

export default ConfiguratorPage;
