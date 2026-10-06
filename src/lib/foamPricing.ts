/** Foam volume from millimetre dimensions → cubic metres. */
export const foamVolumeM3 = (
  lengthMm: number,
  widthMm: number,
  thicknessMm: number,
) => (lengthMm * widthMm * thicknessMm) / 1_000_000_000;

export const foamUnitPriceEur = (
  lengthMm: number,
  widthMm: number,
  thicknessMm: number,
  pricePerM3: number,
) => foamVolumeM3(lengthMm, widthMm, thicknessMm) * pricePerM3;

export const foamTotalPriceEur = (
  lengthMm: number,
  widthMm: number,
  thicknessMm: number,
  pricePerM3: number,
  quantity: number,
) => foamUnitPriceEur(lengthMm, widthMm, thicknessMm, pricePerM3) * quantity;
