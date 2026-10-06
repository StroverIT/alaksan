import { ButtonLink } from "@/components/Button";
import PageIntro from "@/components/PageIntro";
import SiteIcon from "@/components/SiteIcon";
import { COMPANY, CONTACT_CONTENT } from "@/lib/company";
import type { FC } from "react";

const ContactPage: FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageIntro
        eyebrowLabel={CONTACT_CONTENT.eyebrowLabel}
        titleLabel={CONTACT_CONTENT.titleLabel}
        descriptionLabel={CONTACT_CONTENT.introLabel}
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
            {CONTACT_CONTENT.phoneTitleLabel}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {CONTACT_CONTENT.phoneDescriptionLabel}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={COMPANY.phonePrimaryHref}
              className="text-2xl font-semibold tracking-tight text-primary hover:text-accent"
            >
              {COMPANY.phonePrimaryLabel}
            </a>
            <a
              href={COMPANY.phoneSecondaryHref}
              className="text-lg font-medium text-primary hover:text-accent"
            >
              {COMPANY.phoneSecondaryLabel}
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
            {CONTACT_CONTENT.emailTitleLabel}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {CONTACT_CONTENT.emailDescriptionLabel}
          </p>
          <a
            href={`mailto:${COMPANY.emailLabel}`}
            className="mt-5 inline-block break-all text-lg font-semibold text-primary hover:text-accent"
          >
            {COMPANY.emailLabel}
          </a>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
            <SiteIcon name="pin" className="h-4 w-4" />
            {CONTACT_CONTENT.addressTitleLabel}
          </h2>
          <p className="mt-4 font-semibold text-foreground">{COMPANY.legalNameLabel}</p>
          <p className="mt-2 text-muted">{COMPANY.addressLine1Label}</p>
          <p className="text-muted">{COMPANY.addressLine2Label}</p>
          <p className="text-muted">{COMPANY.addressLine3Label}</p>
        </section>
      </div>

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
