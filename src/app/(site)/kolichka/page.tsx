import CheckoutForm from "@/components/CheckoutForm";
import { CHECKOUT_CONTENT } from "@/components/CheckoutForm/consts";
import PageIntro from "@/components/PageIntro";
import type { FC } from "react";

const CartPage: FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageIntro
        eyebrowLabel={CHECKOUT_CONTENT.eyebrowLabel}
        titleLabel={CHECKOUT_CONTENT.titleLabel}
        descriptionLabel={CHECKOUT_CONTENT.descriptionLabel}
      />
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CartPage;
