import CheckoutForm from "@/components/CheckoutForm";
import { CHECKOUT_CONTENT } from "@/components/CheckoutForm/consts";
import type { FC } from "react";

const CartPage: FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-primary">{CHECKOUT_CONTENT.titleLabel}</h1>
      <p className="mt-2 text-sm text-muted">
        B2B заявка без онлайн плащане - ще се свържем за потвърждение и оферта.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CartPage;
