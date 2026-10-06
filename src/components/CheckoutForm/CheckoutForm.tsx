"use client";

import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { CustomerType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { CHECKOUT_CONTENT } from "./consts";

export const CheckoutForm: FC = () => {
  const router = useRouter();
  const { items, removeItem, clearCart } = useCart();
  const [customerType, setCustomerType] = useState<CustomerType>(CustomerType.COMPANY);
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-muted">{CHECKOUT_CONTENT.emptyLabel}</p>
        <ButtonLinkWrap />
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerType,
          contactName,
          email: email || undefined,
          phone,
          companyName: customerType === CustomerType.COMPANY ? companyName : undefined,
          companyId: customerType === CustomerType.COMPANY ? companyId : undefined,
          vatNumber: customerType === CustomerType.COMPANY ? vatNumber : undefined,
          address,
          city,
          notes,
          items,
        }),
      });

      if (!response.ok) {
        throw new Error("failed");
      }

      clearCart();
      toast.success(CHECKOUT_CONTENT.successLabel);
      router.push("/kontakti");
    } catch {
      toast.error(CHECKOUT_CONTENT.errorLabel);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-semibold">Артикули</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border bg-surface p-4 text-sm"
            >
              {item.kind === "CUSTOM_FOAM" ? (
                <>
                  <p className="font-medium">{item.foamTypeName}</p>
                  <p className="font-tabular mt-1 text-muted">
                    {item.lengthCm}×{item.widthCm}×{item.thicknessCm} см · ×{item.quantity}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">{item.productName}</p>
                  <p className="font-tabular mt-1 text-muted">
                    {item.lengthCm && item.widthCm && item.thicknessCm
                      ? `${item.lengthCm}×${item.widthCm}×${item.thicknessCm} см · ×${item.quantity}`
                      : `×${item.quantity}`}
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="mt-2 text-xs text-accent underline"
              >
                Премахни
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3 rounded-2xl border border-border bg-surface p-6">
        <fieldset className="flex flex-wrap gap-3">
          <legend className="sr-only">Тип клиент</legend>
          {(
            [
              [CustomerType.COMPANY, CHECKOUT_CONTENT.customerTypeCompanyLabel],
              [CustomerType.INDIVIDUAL, CHECKOUT_CONTENT.customerTypeIndividualLabel],
            ] as const
          ).map(([type, label]) => (
            <label
              key={type}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${customerType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border"
                }`}
            >
              <input
                type="radio"
                className="sr-only"
                checked={customerType === type}
                onChange={() => setCustomerType(type)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Име за контакт" value={contactName} onChange={setContactName} required />
          <Field label="Телефон" value={phone} onChange={setPhone} required />
          <Field label="Имейл" value={email} onChange={setEmail} type="email" />
          {customerType === CustomerType.COMPANY ? (
            <>
              <Field label="Фирма" value={companyName} onChange={setCompanyName} required />
              <Field label="ЕИК" value={companyId} onChange={setCompanyId} />
              <Field label="ДДС номер" value={vatNumber} onChange={setVatNumber} />
            </>
          ) : null}
          <Field label="Адрес за доставка" value={address} onChange={setAddress} required />
          <Field label="Град" value={city} onChange={setCity} />
        </div>

        <label className="mt-4 block text-sm">
          <span className="font-medium">Допълнителни бележки</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
          />
        </label>

        <Button type="submit" variant="accent" className="mt-6 w-full sm:w-auto" disabled={loading}>
          {loading ? "Изпращане..." : CHECKOUT_CONTENT.submitLabel}
        </Button>
      </div>
    </form>
  );
};

type TFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
};

const Field: FC<TFieldProps> = ({ label, value, onChange, required, type = "text" }) => (
  <label className="block text-sm sm:col-span-1">
    <span className="font-medium">{label}</span>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2"
    />
  </label>
);

const ButtonLinkWrap: FC = () => (
  <Link
    href="/porachka-po-razmer"
    className="mt-4 inline-block text-sm font-medium text-accent underline"
  >
    Към Конфигураторa
  </Link>
);
