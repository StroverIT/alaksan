import ContactInquiryForm from "@/components/ContactInquiryForm";
import GsapReveal from "@/components/GsapReveal";
import SiteIcon from "@/components/SiteIcon";
import { COMPANY } from "@/lib/company";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { CONTENT, PRODUCT_TYPES, REVEAL } from "./consts";
import type { TSoundInsulationProductProps } from "./types";

export const SoundInsulationProduct: FC<TSoundInsulationProductProps> = ({
  productName,
}) => {
  return (
    <div>
      <nav aria-label={CONTENT.breadcrumbLabel} className="text-sm text-muted">
        <Link href="/magazin" className="font-medium text-primary hover:text-accent">
          {CONTENT.breadcrumbLabel}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{productName}</span>
      </nav>

      <GsapReveal
        className="mt-6 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
        group
        duration={REVEAL.duration}
        stagger={REVEAL.stagger}
        y={REVEAL.y}
      >
        <div data-reveal-item>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {CONTENT.eyebrowLabel}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-5xl">
            {CONTENT.titleLabel}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {CONTENT.introLabel}
          </p>
        </div>
        <div
          data-reveal-item
          className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <Image
            src="/images/1000016360-1024x683.png"
            alt={CONTENT.heroImageAltLabel}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-tr from-primary/35 via-transparent to-accent/20"
          />
        </div>
      </GsapReveal>

      <GsapReveal
        className="mt-16 md:mt-20"
        group
        duration={REVEAL.duration}
        stagger={REVEAL.stagger}
        y={REVEAL.y}
      >
        <div data-reveal-item className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {CONTENT.typesEyebrowLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-primary md:text-3xl">
            {CONTENT.typesTitleLabel}
          </h2>
          <p className="mt-3 text-muted">{CONTENT.typesDescriptionLabel}</p>
        </div>

        <div className="mt-10 space-y-12">
          {PRODUCT_TYPES.map((productType, index) => (
            <article
              key={productType.id}
              data-reveal-item
              id={productType.id}
              className={`grid items-start gap-8 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={productType.imagePath}
                  alt={productType.imageAltLabel}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-accent">
                  {productType.subtitleLabel}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-primary">
                  {productType.titleLabel}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">
                  {productType.leadLabel}
                </p>
                <p className="mt-3 leading-relaxed text-muted">
                  {productType.bodyLabel}
                </p>
                <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
                  {productType.advantagesTitleLabel}
                </h4>
                <ul className="mt-3 space-y-2">
                  {productType.advantages.map((advantage) => (
                    <li
                      key={advantage}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <SiteIcon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
                  {productType.noteLabel}
                </p>
              </div>
            </article>
          ))}
        </div>
      </GsapReveal>

      <GsapReveal
        className="mt-16 rounded-2xl border border-border bg-primary px-6 py-10 text-primary-foreground md:mt-20 md:px-10 md:py-12"
        group
        duration={REVEAL.duration}
        stagger={REVEAL.stagger}
        y={REVEAL.y}
      >
        <div data-reveal-item className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {CONTENT.tipsTitleLabel}
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            {CONTENT.tipsDescriptionLabel}
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CONTENT.tipItems.map((tip) => (
            <div data-reveal-item key={tip.titleLabel}>
              <h3 className="text-lg font-semibold text-accent-muted">
                {tip.titleLabel}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                {tip.descriptionLabel}
              </p>
            </div>
          ))}
        </div>
      </GsapReveal>

      <GsapReveal
        className="mt-16 grid items-start gap-8 md:mt-20 lg:grid-cols-5 lg:gap-12"
        group
        duration={REVEAL.duration}
        stagger={REVEAL.stagger}
        y={REVEAL.y}
      >
        <div data-reveal-item className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {CONTENT.contactEyebrowLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-primary md:text-3xl">
            {CONTENT.contactTitleLabel}
          </h2>
          <p className="mt-3 text-muted">{CONTENT.contactDescriptionLabel}</p>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {CONTENT.phoneTitleLabel}
              </p>
              <a
                href={COMPANY.phonePrimaryHref}
                className="mt-2 block text-2xl font-semibold tracking-tight text-primary hover:text-accent"
              >
                {COMPANY.phonePrimaryLabel}
              </a>
              <a
                href={COMPANY.phoneSecondaryHref}
                className="mt-1 block text-lg font-medium text-primary hover:text-accent"
              >
                {COMPANY.phoneSecondaryLabel}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {CONTENT.emailTitleLabel}
              </p>
              <a
                href={`mailto:${COMPANY.emailLabel}`}
                className="mt-2 inline-block break-all text-lg font-semibold text-primary hover:text-accent"
              >
                {COMPANY.emailLabel}
              </a>
            </div>
          </div>
        </div>

        <div data-reveal-item className="lg:col-span-3">
          <ContactInquiryForm />
        </div>
      </GsapReveal>
    </div>
  );
};
