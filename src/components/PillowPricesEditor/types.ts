export type TPillowPriceCell = {
  pillowTypeId: string;
  pillowSizeId: string;
  priceEur: number | null;
};

export type TPillowPricesEditorProps = {
  pillowTypes: { id: string; name: string }[];
  pillowSizes: { id: string; label: string }[];
  pillowPrices: TPillowPriceCell[];
};
