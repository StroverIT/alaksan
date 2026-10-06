import { ButtonLink } from "@/components/Button";
import GsapReveal from "@/components/GsapReveal";
import { PRODUCT_REVEAL } from "@/components/GsapReveal/consts";
import HeroSection from "@/components/HeroSection";
import SiteIcon from "@/components/SiteIcon";
import {
  FEATURES,
  GALLERY_ITEMS,
  HOME_CONTENT,
  PRODUCT_CATEGORIES,
  STEPS,
} from "@/consts";
import { ABOUT_CONTENT, COMPANY } from "@/lib/company";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <HeroSection />

      <GsapReveal className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.titleLabel}
              data-reveal-item
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted/70 text-primary">
                <SiteIcon name={feature.icon} />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-primary">{feature.titleLabel}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.descriptionLabel}
              </p>
            </article>
          ))}
        </div>
      </GsapReveal>

      <section className="bg-surface py-16 md:py-20">
        <GsapReveal
          className="mx-auto max-w-6xl px-4 md:px-6"
          group
          duration={PRODUCT_REVEAL.duration}
          stagger={PRODUCT_REVEAL.stagger}
          y={PRODUCT_REVEAL.y}
        >
          <div data-reveal-item className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {HOME_CONTENT.productsEyebrowLabel}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {HOME_CONTENT.productsTitleLabel}
            </h2>
            <p className="mt-3 text-muted">{HOME_CONTENT.productsDescriptionLabel}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.titleLabel}
                href={category.href}
                data-reveal-item
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{category.titleLabel}</h3>
                  <p className="mt-2 text-sm text-muted">{category.descriptionLabel}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {HOME_CONTENT.categoryCtaLabel}
                    <SiteIcon
                      name="arrow"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </GsapReveal>
      </section>

      <GsapReveal className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div
          data-reveal-item
          className="grid gap-8 rounded-3xl bg-primary px-6 py-10 text-primary-foreground md:grid-cols-2 md:px-10 md:py-12"
        >
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{HOME_CONTENT.whyTitleLabel}</h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85 md:text-base">
              {HOME_CONTENT.whyDescriptionLabel}
            </p>
            <ButtonLink href="/porachka-po-razmer" variant="accent" className="mt-6">
              {HOME_CONTENT.whyCtaLabel}
            </ButtonLink>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {ABOUT_CONTENT.whyItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <SiteIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </GsapReveal>

      <section className="border-y border-border bg-accent-muted/30 py-16 md:py-20">
        <GsapReveal className="mx-auto max-w-6xl px-4 md:px-6">
          <div data-reveal-item>
            <h2 className="text-3xl font-bold tracking-tight">{HOME_CONTENT.stepsTitleLabel}</h2>
            <p className="mt-2 text-muted">{HOME_CONTENT.stepsDescriptionLabel}</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.titleLabel}
                data-reveal-item
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <span className="font-tabular inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-semibold">{step.titleLabel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.descriptionLabel}</p>
              </li>
            ))}
          </ol>
        </GsapReveal>
      </section>

      <GsapReveal className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div data-reveal-item className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">{HOME_CONTENT.galleryTitleLabel}</h2>
          <p className="mt-2 text-muted">{HOME_CONTENT.galleryDescriptionLabel}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <figure
              key={item.src}
              data-reveal-item
              className={`overflow-hidden rounded-2xl border border-border bg-surface ${
                index === 0 ? "col-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-16/10" : "aspect-4/3"}`}>
                <Image
                  src={item.src}
                  alt={item.altLabel}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "25vw"}
                />
              </div>
              <figcaption className="px-3 py-2 text-sm font-medium text-foreground">
                {item.captionLabel}
              </figcaption>
            </figure>
          ))}
        </div>
      </GsapReveal>

      <section className="px-4 pb-16 md:px-6 md:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface px-6 py-8 shadow-sm md:flex-row md:items-center md:px-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {HOME_CONTENT.closingTitleLabel}
            </h2>
            <p className="mt-2 text-sm text-muted md:text-base">
              {HOME_CONTENT.closingDescriptionLabel}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/porachka-po-razmer" variant="accent">
              {HOME_CONTENT.closingPrimaryLabel}
            </ButtonLink>
            <ButtonLink href={COMPANY.phonePrimaryHref} variant="secondary">
              {HOME_CONTENT.closingSecondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
