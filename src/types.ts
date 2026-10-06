import type { CustomerType, OrderStatus } from "@prisma/client";

export type { CustomerType, OrderStatus };

export type TCartFoamItem = {
  id: string;
  kind: "CUSTOM_FOAM";
  foamTypeId: string;
  foamTypeName: string;
  lengthCm: number;
  widthCm: number;
  thicknessCm: number;
  quantity: number;
  unitPriceEur?: number;
  notes?: string;
};

export type TCartProductItem = {
  id: string;
  kind: "CATALOG_PRODUCT";
  catalogProductId: string;
  productName: string;
  quantity: number;
  lengthCm?: number;
  widthCm?: number;
  thicknessCm?: number;
  unitPriceEur?: number;
  notes?: string;
};

export type TCartItem = TCartFoamItem | TCartProductItem;

export type TOrderSubmitPayload = {
  customerType: CustomerType;
  contactName: string;
  email?: string;
  phone: string;
  companyName?: string;
  companyId?: string;
  vatNumber?: string;
  address: string;
  city?: string;
  notes?: string;
  items: TCartItem[];
};
