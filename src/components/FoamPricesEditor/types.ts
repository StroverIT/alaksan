export type TFoamPriceRow = {
  id: string;
  code: string;
  name: string;
  pricePerM3: number | null;
};

export type TFoamPricesEditorProps = {
  foamTypes: TFoamPriceRow[];
};
