export const PRODUCT_TAB = {
  DUNAPREN: "dunapren",
  VAZGLAVNICI: "vazglavnici",
  KALAFI: "kalafi",
} as const;

export type TProductTab = (typeof PRODUCT_TAB)[keyof typeof PRODUCT_TAB];

export const DEFAULT_PRODUCT_TAB = PRODUCT_TAB.DUNAPREN;

export const CONTENT = {
  titleLabel: "Продукти",
  leadLabel: "Настройки и цени по продуктов тип",
  dunaprenLeadLabel: "Цени на дунапрен за калкулатора (€ / m³)",
  vazglavniciLeadLabel: "Цени за възглавници (€ / бр.)",
  kalafiLeadLabel: "Тарифа за калъфи (€ / m² плат)",
};

export const PRODUCT_TABS = [
  {
    id: PRODUCT_TAB.DUNAPREN,
    label: "Дунапрен",
    href: `/admin/produkti?tab=${PRODUCT_TAB.DUNAPREN}`,
  },
  {
    id: PRODUCT_TAB.VAZGLAVNICI,
    label: "Възглавници",
    href: `/admin/produkti?tab=${PRODUCT_TAB.VAZGLAVNICI}`,
  },
  {
    id: PRODUCT_TAB.KALAFI,
    label: "Калъфи",
    href: `/admin/produkti?tab=${PRODUCT_TAB.KALAFI}`,
  },
] as const;

export const isProductTab = (value: string | undefined): value is TProductTab =>
  value === PRODUCT_TAB.DUNAPREN ||
  value === PRODUCT_TAB.VAZGLAVNICI ||
  value === PRODUCT_TAB.KALAFI;
