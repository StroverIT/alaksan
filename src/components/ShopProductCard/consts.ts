import { CATALOG_PRODUCT_KIND, type TCatalogProductKind } from "@/lib/catalog";

export const CONTENT = {
  foamCtaLabel: "Избери вид и размер",
  dimensionsCtaLabel: "Избери размери",
  pillowCtaLabel: "Избери вид и размер",
  infoCtaLabel: "Научи повече",
  unavailableCtaLabel: "Очаквай скоро",
  unavailableBadgeLabel: "Не е наличен",
  defaultCtaLabel: "Виж продукта",
};

export const CTA_LABELS: Record<TCatalogProductKind, string> = {
  [CATALOG_PRODUCT_KIND.FOAM_CONFIGURATOR]: CONTENT.foamCtaLabel,
  [CATALOG_PRODUCT_KIND.DIMENSIONS]: CONTENT.dimensionsCtaLabel,
  [CATALOG_PRODUCT_KIND.PILLOW_CONFIGURATOR]: CONTENT.pillowCtaLabel,
  [CATALOG_PRODUCT_KIND.INFO_PAGE]: CONTENT.infoCtaLabel,
  [CATALOG_PRODUCT_KIND.UNAVAILABLE]: CONTENT.unavailableCtaLabel,
};
