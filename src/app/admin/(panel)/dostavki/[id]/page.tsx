import OrderStatusSelect from "@/components/OrderStatusSelect";
import { ORDER_STATUS_LABELS } from "@/consts";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";

type TPageProps = {
  params: Promise<{ id: string }>;
};

const DeliveryDetailPage: FC<TPageProps> = async ({ params }) => {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      lineItems: {
        include: { foamType: true, catalogProduct: true },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/dostavki" className="text-sm text-accent hover:underline">
        ← Назад към доставки
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Поръчка {order.orderNumber.slice(0, 8)}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {new Date(order.createdAt).toLocaleString("bg-BG")}
          </p>
        </div>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <section className="mt-8 rounded-xl border border-admin-border bg-admin-surface p-5">
        <h2 className="font-semibold text-foreground">Клиент</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Тип</dt>
            <dd>{order.customerType === "COMPANY" ? "Фирма" : "Физическо лице"}</dd>
          </div>
          <div>
            <dt className="text-muted">Контакт</dt>
            <dd>{order.contactName}</dd>
          </div>
          <div>
            <dt className="text-muted">Телефон</dt>
            <dd>{order.phone}</dd>
          </div>
          {order.email ? (
            <div>
              <dt className="text-muted">Имейл</dt>
              <dd>{order.email}</dd>
            </div>
          ) : null}
          {order.companyName ? (
            <div>
              <dt className="text-muted">Фирма</dt>
              <dd>{order.companyName}</dd>
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <dt className="text-muted">Адрес</dt>
            <dd>
              {order.address}
              {order.city ? `, ${order.city}` : ""}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold text-foreground">Артикули</h2>
        <ul className="mt-3 space-y-3">
          {order.lineItems.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-admin-border bg-admin-surface p-4 text-sm"
            >
              {item.kind === "CUSTOM_FOAM" ? (
                <>
                  <p className="font-medium">
                    {item.foamType?.name ?? item.productName}
                  </p>
                  <p className="font-tabular mt-1 text-muted">
                    Дължина {item.lengthCm} мм · Ширина {item.widthCm} мм · Дебелина{" "}
                    {item.thicknessCm} мм · Количество {item.quantity}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">
                    {item.catalogProduct?.name ?? item.productName}
                  </p>
                  <p className="font-tabular mt-1 text-muted">
                    {item.lengthCm && item.widthCm && item.thicknessCm
                      ? `Дължина ${item.lengthCm} см · Ширина ${item.widthCm} см · Височина ${item.thicknessCm} см · Количество ${item.quantity}`
                      : `Количество ${item.quantity}`}
                    {item.unitPriceEur != null
                      ? ` · ${(item.unitPriceEur * item.quantity).toFixed(2)} €`
                      : ""}
                  </p>
                </>
              )}
              {item.notes ? <p className="mt-2 text-muted">{item.notes}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-xs text-muted">
        Статус: {ORDER_STATUS_LABELS[order.status]}
      </p>
    </div>
  );
};

export default DeliveryDetailPage;
