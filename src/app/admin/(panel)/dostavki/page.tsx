import { ORDER_STATUS_LABELS } from "@/consts";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { FC } from "react";

const DeliveriesPage: FC = async () => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      lineItems: {
        include: { foamType: true },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Доставки</h1>
      <p className="mt-1 text-sm text-muted">Всички поръчки и заявки от сайта</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-admin-border bg-admin-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-admin-border bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Дата</th>
              <th className="px-4 py-3 font-medium">Клиент</th>
              <th className="px-4 py-3 font-medium">Тип</th>
              <th className="px-4 py-3 font-medium">Артикули</th>
              <th className="px-4 py-3 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Няма поръчки все още.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-admin-border hover:bg-background/80"
                >
                  <td className="px-4 py-3 font-tabular">
                    {new Date(order.createdAt).toLocaleDateString("bg-BG")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/dostavki/${order.id}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {order.customerType === "COMPANY"
                        ? (order.companyName ?? order.contactName)
                        : order.contactName}
                    </Link>
                    <p className="text-xs text-muted">{order.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    {order.customerType === "COMPANY" ? "Фирма" : "Физ. лице"}
                  </td>
                  <td className="px-4 py-3 font-tabular">{order.lineItems.length}</td>
                  <td className="px-4 py-3">
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveriesPage;
