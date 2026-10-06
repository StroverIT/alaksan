import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const patchSchema = z.object({
  prices: z
    .array(
      z.object({
        pillowTypeId: z.string().min(1),
        pillowSizeId: z.string().min(1),
        priceEur: z.number().nonnegative().nullable(),
      }),
    )
    .min(1),
});

export const PATCH = async (request: Request) => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.$transaction(
    parsed.data.prices.map((row) =>
      prisma.pillowPrice.upsert({
        where: {
          pillowTypeId_pillowSizeId: {
            pillowTypeId: row.pillowTypeId,
            pillowSizeId: row.pillowSizeId,
          },
        },
        update: { priceEur: row.priceEur },
        create: {
          pillowTypeId: row.pillowTypeId,
          pillowSizeId: row.pillowSizeId,
          priceEur: row.priceEur,
        },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
};
