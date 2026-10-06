import PageIntro from "@/components/PageIntro";
import SiteIcon from "@/components/SiteIcon";
import { IMAGES } from "@/consts";
import { ABOUT_CONTENT, COMPANY } from "@/lib/company";
import Image from "next/image";
import type { FC } from "react";

const AboutPage: FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageIntro
        eyebrowLabel={ABOUT_CONTENT.eyebrowLabel}
        titleLabel={ABOUT_CONTENT.titleLabel}
        descriptionLabel={ABOUT_CONTENT.introLabel}
      />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border">
          <Image
            src={IMAGES.workshop}
            alt={IMAGES.workshopAltLabel}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary">
            {ABOUT_CONTENT.productionTitleLabel}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{ABOUT_CONTENT.productionLabel}</p>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-semibold text-primary">{ABOUT_CONTENT.whyTitleLabel}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT_CONTENT.whyItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-sm"
          >
            <SiteIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <p className="font-semibold text-foreground">{COMPANY.legalNameLabel}</p>
        <p className="mt-2 text-muted">{COMPANY.addressFullLabel}</p>
        <p className="mt-3">
          <a href={COMPANY.phonePrimaryHref} className="font-medium text-primary hover:text-accent">
            {COMPANY.phonePrimaryLabel}
          </a>
          <span className="text-muted"> · </span>
          <a
            href={COMPANY.phoneSecondaryHref}
            className="font-medium text-primary hover:text-accent"
          >
            {COMPANY.phoneSecondaryLabel}
          </a>
        </p>
        <p className="mt-1">
          <a
            href={`mailto:${COMPANY.emailLabel}`}
            className="font-medium text-primary hover:text-accent"
          >
            {COMPANY.emailLabel}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
