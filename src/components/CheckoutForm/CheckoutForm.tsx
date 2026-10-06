"use client";

import Button, { ButtonLink } from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { CustomerType } from "@prisma/client";
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
      <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
        <p className="text-lg font-semibold text-foreground">{CHECKOUT_CONTENT.emptyLabel}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          {CHECKOUT_CONTENT.emptyDescriptionLabel}
        </p>
        <ButtonLink href="/porachka-po-razmer" variant="accent" className="mt-6">
          {CHECKOUT_CONTENT.emptyCtaLabel}
        </ButtonLink>
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
                    {item.lengthCm}×{item.widthCm}×{item.thicknessCm} мм · ×{item.quantity}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">{item.productName}</p>
                  <p className="font-tabular mt-1 text-muted">
                    {item.lengthCm && item.widthCm && item.thicknessCm
                      ? `${item.lengthCm}×${item.widthCm}×${item.thicknessCm} см · ×${item.quantity}`
                      : `×${item.quantity}`}
                    {item.unitPriceEur != null
                      ? ` · ${(item.unitPriceEur * item.quantity).toFixed(2)} €`
                      : ""}
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
          <Field
            label="Име за контакт"
            value={contactName}
            onChange={setContactName}
            autoComplete="name"
            required
          />
          <Field
            label="Телефон"
            value={phone}
            onChange={setPhone}
            type="tel"
            autoComplete="tel"
            required
          />
          <Field
            label="Имейл"
            value={email}
            onChange={setEmail}
            type="email"
            autoComplete="email"
          />
          {customerType === CustomerType.COMPANY ? (
            <>
              <Field
                label="Фирма"
                value={companyName}
                onChange={setCompanyName}
                autoComplete="organization"
                required
              />
              <Field label="ЕИК" value={companyId} onChange={setCompanyId} />
              <Field label="ДДС номер" value={vatNumber} onChange={setVatNumber} />
            </>
          ) : null}
          <Field
            label="Адрес за доставка"
            value={address}
            onChange={setAddress}
            autoComplete="street-address"
            required
          />
          <Field
            label="Град"
            value={city}
            onChange={setCity}
            autoComplete="address-level2"
          />
        </div>

        <label className="mt-4 block text-sm">
          <span className="font-medium">Допълнителни бележки</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            className="field"
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
  autoComplete?: string;
};

const Field: FC<TFieldProps> = ({
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
}) => (
  <label className="block text-sm sm:col-span-1">
    <span className="font-medium">{label}</span>
    <input
      type={type}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="field"
    />
  </label>
);
