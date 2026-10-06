import { ButtonLink } from "@/components/Button";
import { CONTENT, NAV_LINKS } from "@/consts";
import { COMPANY } from "@/lib/company";
import Link from "next/link";
import type { FC } from "react";
import { FOOTER_CONTENT } from "./consts";
import type { TFooterProps } from "./types";

export const Footer: FC<TFooterProps> = () => {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <h2 className="text-2xl font-semibold">{FOOTER_CONTENT.contactTitleLabel}</h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            {FOOTER_CONTENT.contactDescriptionLabel}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={COMPANY.phonePrimaryHref} variant="accent">
              {CONTENT.footerPhoneLabel}
            </ButtonLink>
            <ButtonLink href="/kontakti" variant="secondary">
              {FOOTER_CONTENT.quoteCtaLabel}
            </ButtonLink>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-muted">
            {FOOTER_CONTENT.navigationLabel}
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-primary-foreground/85 hover:text-accent-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-medium text-primary-foreground">{FOOTER_CONTENT.companyLabel}</p>
          <p className="text-primary-foreground/75">{FOOTER_CONTENT.addressLabel}</p>
          <p>
            <a
              href={COMPANY.phonePrimaryHref}
              className="text-lg font-semibold text-primary-foreground hover:text-accent-muted"
            >
              {FOOTER_CONTENT.phoneLabel}
            </a>
          </p>
          <p>
            <a href={COMPANY.phoneSecondaryHref} className="hover:text-accent-muted">
              {FOOTER_CONTENT.phoneSecondaryLabel}
            </a>
          </p>
          <p>
            <a href={`mailto:${COMPANY.emailLabel}`} className="hover:text-accent-muted">
              {FOOTER_CONTENT.emailLabel}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {FOOTER_CONTENT.companyLabel}. {CONTENT.footerRightsLabel}
      </div>
    </footer>
  );
};
