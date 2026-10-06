import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const KIND = {
  FOAM_CONFIGURATOR: "FOAM_CONFIGURATOR",
  DIMENSIONS: "DIMENSIONS",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

const FOAM_TYPES = [
  {
    code: "PU-25",
    name: "PU дунапрен 25 kg/m³",
    density: "25 kg/m³",
    description: "Универсален за мебели и подложки",
  },
  {
    code: "PU-35",
    name: "PU дунапрен 35 kg/m³",
    density: "35 kg/m³",
    description: "По-твърд, за седалки и матраци",
  },
  {
    code: "PU-45",
    name: "PU дунапрен 45 kg/m³",
    density: "45 kg/m³",
    description: "Висока издръжливост за индустрия",
  },
  {
    code: "MEM-REF",
    name: "Memory foam",
    density: "50 kg/m³",
    description: "Анатомичен комфорт",
  },
  {
    code: "ACOUSTIC",
    name: "Акустичен дунапрен",
    density: "30 kg/m³",
    description: "Шумоизолация и студиа",
  },
];

const CATALOG = [
  {
    slug: "dunapreni-po-razmer",
    name: "Дунапрен по размер",
    description:
      "Дунапрен по размер с избор на дължина, ширина, дебелина и плътност. Подходящ за мебели, матраци, възглавници, седалки и индивидуални проекти. Доставка в цяла България.",
    imagePath: "/images/1000016354-1-1024x683.png",
    kind: KIND.FOAM_CONFIGURATOR,
    active: true,
  },
  {
    slug: "vazglavnici",
    name: "Възглавници",
    description: "За сън, мебели и декорация",
    imagePath: "/images/1000016359-1024x683.png",
    kind: KIND.UNAVAILABLE,
    active: true,
  },
  {
    slug: "kalafi-za-matraci",
    name: "Калъфи за матраци",
    description: "Калъфи по размер на матрака - ширина, дължина и височина.",
    imagePath: "/images/1000016358-1024x683.png",
    kind: KIND.DIMENSIONS,
    active: true,
  },
];

const DEPRECATED_SLUGS = ["matraci", "shumoisolacia", "vazglavnici-po-razmer"];

const main = async () => {
  for (const foam of FOAM_TYPES) {
    await prisma.foamType.upsert({
      where: { code: foam.code },
      update: foam,
      create: foam,
    });
  }

  for (const product of CATALOG) {
    await prisma.catalogProduct.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  await prisma.catalogProduct.updateMany({
    where: { slug: { in: DEPRECATED_SLUGS } },
    data: { active: false },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
