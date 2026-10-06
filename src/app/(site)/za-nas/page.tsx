import { ABOUT_CONTENT, COMPANY } from "@/lib/company";
import type { FC } from "react";

const AboutPage: FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-primary">{ABOUT_CONTENT.titleLabel}</h1>
      <p className="mt-6 text-muted leading-relaxed">{ABOUT_CONTENT.introLabel}</p>

      <h2 className="mt-10 text-2xl font-semibold text-primary">
        {ABOUT_CONTENT.productionTitleLabel}
      </h2>
      <p className="mt-4 text-muted leading-relaxed">{ABOUT_CONTENT.productionLabel}</p>

      <h2 className="mt-10 text-2xl font-semibold text-primary">
        {ABOUT_CONTENT.whyTitleLabel}
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
        {ABOUT_CONTENT.whyItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm">
        <p className="font-semibold text-foreground">{COMPANY.legalNameLabel}</p>
        <p className="mt-2 text-muted">{COMPANY.addressFullLabel}</p>
        <p className="mt-2 text-muted">
          {COMPANY.phonePrimaryLabel} · {COMPANY.phoneSecondaryLabel}
        </p>
        <p className="mt-1 text-muted">{COMPANY.emailLabel}</p>
      </div>
    </div>
  );
};

export default AboutPage;
