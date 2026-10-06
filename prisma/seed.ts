import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const KIND = {
  FOAM_CONFIGURATOR: "FOAM_CONFIGURATOR",
  DIMENSIONS: "DIMENSIONS",
  PILLOW_CONFIGURATOR: "PILLOW_CONFIGURATOR",
  INFO_PAGE: "INFO_PAGE",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

/** Prices (EUR / m³) synced from WordPress ALAKSAN foam calculator. */
const FOAM_TYPES = [
  { code: "N1812", name: "N1812", pricePerM3: 83.9, sortOrder: 1 },
  { code: "N1830", name: "N1830", pricePerM3: 86.56, sortOrder: 2 },
  { code: "N2130", name: "N2130", pricePerM3: 102.24, sortOrder: 3 },
  { code: "N2220", name: "N2220", pricePerM3: 107.67, sortOrder: 4 },
  { code: "N2335", name: "N2335", pricePerM3: 106.24, sortOrder: 5 },
  { code: "N2528", name: "N2528", pricePerM3: 109.72, sortOrder: 6 },
  { code: "N2538", name: "N2538", pricePerM3: 109.9, sortOrder: 7 },
  { code: "N2542", name: "N2542", pricePerM3: 108.8, sortOrder: 8 },
  { code: "N3030", name: "N3030", pricePerM3: 133.02, sortOrder: 9 },
  { code: "N3050", name: "N3050", pricePerM3: 132.06, sortOrder: 10 },
  { code: "N3236", name: "N3236", pricePerM3: 153.71, sortOrder: 11 },
  { code: "N3550", name: "N3550", pricePerM3: 151.58, sortOrder: 12 },
  { code: "N4050", name: "N4050", pricePerM3: 173.34, sortOrder: 13 },
  { code: "R2215", name: "R2215", pricePerM3: 104.77, sortOrder: 14 },
  { code: "R3028", name: "R3028", pricePerM3: 146.56, sortOrder: 15 },
  { code: "R3530", name: "R3530", pricePerM3: 169.79, sortOrder: 16 },
  { code: "R3536", name: "R3536", pricePerM3: 166.55, sortOrder: 17 },
  { code: "K4090", name: "K4090", pricePerM3: 186.09, sortOrder: 18 },
  { code: "NF2840", name: "NF2840", pricePerM3: 122.69, sortOrder: 19 },
  { code: "RF4550", name: "RF4550", pricePerM3: 242.52, sortOrder: 20 },
  { code: "MEMORY3018", name: "MEMORY3018", pricePerM3: 169.91, sortOrder: 21 },
  { code: "MEMORY4015", name: "MEMORY4015", pricePerM3: 226.04, sortOrder: 22 },
  { code: "MEMORY5015", name: "MEMORY5015", pricePerM3: 278.83, sortOrder: 23 },
];

const DEPRECATED_FOAM_CODES = [
  "PU-25",
  "PU-35",
  "PU-45",
  "MEM-REF",
  "ACOUSTIC",
];

/** Pillow options synced from WordPress variable product attributes. */
const PILLOW_TYPES = [
  { code: "silikonov-puh", name: "Силиконов пух", sortOrder: 1 },
  { code: "nakasan-dunapren", name: "Накъсан дунапрен", sortOrder: 2 },
  { code: "memori-pyana", name: "Мемори пяна", sortOrder: 3 },
  { code: "anatomichna-memori", name: "Анатомична мемори пяна", sortOrder: 4 },
  { code: "dekorativna", name: "Декоративна", sortOrder: 5 },
];

const PILLOW_SIZES = [
  { code: "40x40", label: "40×40 см", widthCm: 40, lengthCm: 40, sortOrder: 1 },
  { code: "45x45", label: "45×45 см", widthCm: 45, lengthCm: 45, sortOrder: 2 },
  { code: "50x50", label: "50×50 см", widthCm: 50, lengthCm: 50, sortOrder: 3 },
  { code: "40x60", label: "40×60 см", widthCm: 40, lengthCm: 60, sortOrder: 4 },
  { code: "50x70", label: "50×70 см", widthCm: 50, lengthCm: 70, sortOrder: 5 },
  { code: "70x70", label: "70×70 см", widthCm: 70, lengthCm: 70, sortOrder: 6 },
];

const CATALOG = [
  {
    slug: "dunapreni-po-razmer",
    name: "Дунапрен по размер",
    description:
      "Дунапрен по размер с избор на дължина, ширина, дебелина и плътност. Подходящ за мебели, матраци, възглавници, седалки и индивидуални проекти. Доставка в цяла България.",
    imagePath: "/images/1000016358-1024x683.png",
    kind: KIND.FOAM_CONFIGURATOR,
    active: true,
  },
  {
    slug: "vazglavnici",
    name: "Възглавници",
    description:
      "Възглавници по вид и размер - силиконов пух, накъсан дунапрен, мемори пяна и декоративни варианти.",
    imagePath: "/images/1000016359-1024x683.png",
    kind: KIND.PILLOW_CONFIGURATOR,
    active: true,
  },
  {
    slug: "kalafi-za-matraci",
    name: "Калъфи за матраци",
    description: "Калъфи по размер на матрака - ширина, дължина и височина.",
    imagePath: "/images/1000016354-1-1024x683.png",
    kind: KIND.DIMENSIONS,
    pricePerM2: 11.8,
    active: true,
  },
  {
    slug: "shumoizolacia",
    name: "Шумоизолация",
    description:
      "Репрен с висока плътност и акустични панели за намаляване на шума, вибрациите и ехото. Изработка по индивидуални размери.",
    imagePath: "/images/1000016360-1024x683.png",
    kind: KIND.INFO_PAGE,
    active: true,
  },
];

const DEPRECATED_SLUGS = ["matraci", "shumoisolacia", "vazglavnici-po-razmer"];

const main = async () => {
  for (const foam of FOAM_TYPES) {
    await prisma.foamType.upsert({
      where: { code: foam.code },
      update: { ...foam, active: true },
      create: foam,
    });
  }

  await prisma.foamType.updateMany({
    where: { code: { in: DEPRECATED_FOAM_CODES } },
    data: { active: false },
  });

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

  for (const type of PILLOW_TYPES) {
    await prisma.pillowType.upsert({
      where: { code: type.code },
      update: { ...type, active: true },
      create: type,
    });
  }

  for (const size of PILLOW_SIZES) {
    await prisma.pillowSize.upsert({
      where: { code: size.code },
      update: { ...size, active: true },
      create: size,
    });
  }

  const pillowTypes = await prisma.pillowType.findMany({
    where: { active: true },
  });
  const pillowSizes = await prisma.pillowSize.findMany({
    where: { active: true },
  });

  for (const type of pillowTypes) {
    for (const size of pillowSizes) {
      await prisma.pillowPrice.upsert({
        where: {
          pillowTypeId_pillowSizeId: {
            pillowTypeId: type.id,
            pillowSizeId: size.id,
          },
        },
        update: {},
        create: {
          pillowTypeId: type.id,
          pillowSizeId: size.id,
          priceEur: null,
        },
      });
    }
  }
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
