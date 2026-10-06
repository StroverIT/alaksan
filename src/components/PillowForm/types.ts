export type TPillowTypeOption = {
  id: string;
  name: string;
};

export type TPillowSizeOption = {
  id: string;
  label: string;
  widthCm: number;
  lengthCm: number;
};

export type TPillowPriceOption = {
  pillowTypeId: string;
  pillowSizeId: string;
  priceEur: number | null;
};

export type TPillowFormProps = {
  catalogProductId: string;
  productName: string;
  pillowTypes: TPillowTypeOption[];
  pillowSizes: TPillowSizeOption[];
  pillowPrices: TPillowPriceOption[];
};
