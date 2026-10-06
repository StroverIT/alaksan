import { CustomerType } from "@prisma/client";
import { z } from "zod";

const cartItemSchema = z.discriminatedUnion("kind", [
  z.object({
    id: z.string(),
    kind: z.literal("CUSTOM_FOAM"),
    foamTypeId: z.string(),
    foamTypeName: z.string(),
    lengthCm: z.number().positive(),
    widthCm: z.number().positive(),
    thicknessCm: z.number().positive(),
    quantity: z.number().int().positive(),
    notes: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    kind: z.literal("CATALOG_PRODUCT"),
    catalogProductId: z.string(),
    productName: z.string(),
    quantity: z.number().int().positive(),
    lengthCm: z.number().positive().optional(),
    widthCm: z.number().positive().optional(),
    thicknessCm: z.number().positive().optional(),
    notes: z.string().optional(),
  }),
]);

export const orderSubmitSchema = z
  .object({
    customerType: z.nativeEnum(CustomerType),
    contactName: z.string().min(2),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().min(6),
    companyName: z.string().optional(),
    companyId: z.string().optional(),
    vatNumber: z.string().optional(),
    address: z.string().min(5),
    city: z.string().optional(),
    notes: z.string().optional(),
    items: z.array(cartItemSchema).min(1),
  })
  .superRefine((data, ctx) => {
    if (data.customerType === CustomerType.COMPANY && !data.companyName?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Името на фирмата е задължително",
        path: ["companyName"],
      });
    }
  });

export type TOrderSubmitInput = z.infer<typeof orderSubmitSchema>;
