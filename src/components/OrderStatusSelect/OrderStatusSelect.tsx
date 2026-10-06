"use client";

import { ORDER_STATUS_LABELS } from "@/consts";
import type { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { toast } from "sonner";

type TOrderStatusSelectProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

export const OrderStatusSelect: FC<TOrderStatusSelectProps> = ({
  orderId,
  currentStatus,
}) => {
  const router = useRouter();

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as OrderStatus;

    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      toast.error("Неуспешна смяна на статус");
      return;
    }

    toast.success("Статусът е обновен");
    router.refresh();
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="rounded-lg border border-admin-border bg-admin-surface px-3 py-2 text-sm text-foreground"
    >
      {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
