/** Mattress cover fabric area = all 6 sides of the mattress box (cm → m²). */
export const coverAreaM2 = (
  lengthCm: number,
  widthCm: number,
  heightCm: number,
) =>
  (2 * (lengthCm * widthCm + lengthCm * heightCm + widthCm * heightCm)) / 10_000;

export const coverUnitPriceEur = (
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  pricePerM2: number,
) => coverAreaM2(lengthCm, widthCm, heightCm) * pricePerM2;

export const coverTotalPriceEur = (
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  pricePerM2: number,
  quantity: number,
) => coverUnitPriceEur(lengthCm, widthCm, heightCm, pricePerM2) * quantity;

export const formatEur = (value: number) =>
  `${value.toFixed(2).replace(".", ",")} €`;

/** Default rate synced from WordPress Uni CPO calculator. */
export const DEFAULT_COVER_PRICE_PER_M2 = 11.8;
