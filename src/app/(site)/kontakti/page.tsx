import { ButtonLink } from "@/components/Button";
import { COMPANY, CONTACT_CONTENT } from "@/lib/company";
import type { FC } from "react";

const ContactPage: FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-primary">{CONTACT_CONTENT.titleLabel}</h1>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">{CONTACT_CONTENT.emailTitleLabel}</h2>
          <p className="mt-2 text-sm text-muted">{CONTACT_CONTENT.emailDescriptionLabel}</p>
          <a
            href={`mailto:${COMPANY.emailLabel}`}
            className="mt-4 inline-block font-medium text-accent hover:underline"
          >
            {COMPANY.emailLabel}
          </a>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold">{CONTACT_CONTENT.phoneTitleLabel}</h2>
          <p className="mt-2 text-sm text-muted">{CONTACT_CONTENT.phoneDescriptionLabel}</p>
          <div className="mt-4 flex flex-col gap-1">
            <a
              href={COMPANY.phonePrimaryHref}
              className="font-medium text-accent hover:underline"
            >
              {COMPANY.phonePrimaryLabel}
            </a>
            <a
              href={COMPANY.phoneSecondaryHref}
              className="font-medium text-accent hover:underline"
            >
              {COMPANY.phoneSecondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">{CONTACT_CONTENT.addressTitleLabel}</h2>
        <p className="mt-2 font-medium">{COMPANY.legalNameLabel}</p>
        <p className="mt-1 text-muted">{COMPANY.addressLine1Label}</p>
        <p className="text-muted">{COMPANY.addressLine2Label}</p>
        <p className="text-muted">{COMPANY.addressLine3Label}</p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={COMPANY.phonePrimaryHref} variant="accent">
          {CONTACT_CONTENT.callCtaLabel}
        </ButtonLink>
        <ButtonLink href={`mailto:${COMPANY.emailLabel}`} variant="secondary">
          {CONTACT_CONTENT.emailCtaLabel}
        </ButtonLink>
        <ButtonLink href="/porachka-po-razmer" variant="primary">
          {CONTACT_CONTENT.orderCtaLabel}
        </ButtonLink>
      </div>
    </div>
  );
};

export default ContactPage;
