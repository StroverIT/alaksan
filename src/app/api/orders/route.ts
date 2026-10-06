import { prisma } from "@/lib/prisma";
import { orderSubmitSchema } from "@/lib/validations";
import { LineItemKind } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = orderSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const order = await prisma.order.create({
      data: {
        customerType: data.customerType,
        contactName: data.contactName,
        email: data.email || null,
        phone: data.phone,
        companyName: data.companyName || null,
        companyId: data.companyId || null,
        vatNumber: data.vatNumber || null,
        address: data.address,
        city: data.city || null,
        notes: data.notes || null,
        lineItems: {
          create: data.items.map((item) => {
            if (item.kind === "CUSTOM_FOAM") {
              return {
                kind: LineItemKind.CUSTOM_FOAM,
                foamTypeId: item.foamTypeId,
                lengthCm: item.lengthCm,
                widthCm: item.widthCm,
                thicknessCm: item.thicknessCm,
                quantity: item.quantity,
                unitPriceEur: item.unitPriceEur ?? null,
                notes: item.notes || null,
                productName: item.foamTypeName,
              };
            }

            return {
              kind: LineItemKind.CATALOG_PRODUCT,
              catalogProductId: item.catalogProductId,
              quantity: item.quantity,
              lengthCm: item.lengthCm ?? null,
              widthCm: item.widthCm ?? null,
              thicknessCm: item.thicknessCm ?? null,
              unitPriceEur: item.unitPriceEur ?? null,
              notes: item.notes || null,
              productName: item.productName,
            };
          }),
        },
      },
      include: { lineItems: true },
    });

    return NextResponse.json({ orderId: order.id, orderNumber: order.orderNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Грешка при запис на поръчката" },
      { status: 500 },
    );
  }
};
