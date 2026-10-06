import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const patchSchema = z.object({
  id: z.string().min(1),
  pricePerM2: z.number().nonnegative().nullable(),
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

  const product = await prisma.catalogProduct.update({
    where: { id: parsed.data.id },
    data: { pricePerM2: parsed.data.pricePerM2 },
  });

  return NextResponse.json({ product });
};
