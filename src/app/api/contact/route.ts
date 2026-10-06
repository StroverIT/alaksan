import { prisma } from "@/lib/prisma";
import { contactInquirySchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = contactInquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest || null,
        message: data.message,
        source: data.source || null,
      },
    });

    return NextResponse.json({ id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Грешка при изпращане" }, { status: 500 });
  }
};
