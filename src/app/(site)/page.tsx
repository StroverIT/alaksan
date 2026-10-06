import { FEATURES, IMAGES, PRODUCT_CATEGORIES, STEPS } from "@/consts";
import GsapReveal from "@/components/GsapReveal";
import HeroSection from "@/components/HeroSection";
import { ButtonLink } from "@/components/Button";
import Image from "next/image";
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
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-primary">{feature.titleLabel}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.descriptionLabel}
              </p>
            </article>
          ))}
        </div>
      </GsapReveal>

      <section className="bg-surface py-16 md:py-20">
        <GsapReveal className="mx-auto max-w-6xl px-4 md:px-6">
          <div data-reveal-item className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Нашите продукти
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
              Решения за индустрията и дома
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <article
                key={category.titleLabel}
                data-reveal-item
                className="group overflow-hidden rounded-2xl border border-border bg-background"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.titleLabel}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{category.titleLabel}</h3>
                  <p className="mt-2 text-sm text-muted">{category.descriptionLabel}</p>
                  <ButtonLink
                    href={category.href}
                    variant="ghost"
                    className="mt-4 px-0 text-accent hover:bg-transparent"
                  >
                    Научи повече →
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </GsapReveal>
      </section>

      <GsapReveal className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div data-reveal-item className="rounded-3xl bg-primary px-6 py-10 text-primary-foreground md:px-10">
          <h2 className="text-2xl font-bold md:text-3xl">Защо да изберете Alaksan</h2>
          <p className="mt-3 max-w-3xl text-sm text-primary-foreground/85 md:text-base">
            Използваме висококачествени материали и професионално оборудване, за да
            изработим всеки продукт по точен размер. Работим бързо, коректно и с внимание
            към всеки детайл.
          </p>
        </div>
      </GsapReveal>

      <section className="border-y border-border bg-accent-muted/30 py-16 md:py-20">
        <GsapReveal className="mx-auto max-w-6xl px-4 md:px-6">
          <div data-reveal-item>
            <h2 className="text-3xl font-bold">Поръчката при нас е лесна</h2>
            <p className="mt-2 text-muted">Четири стъпки до готовия продукт</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.titleLabel}
                data-reveal-item
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <span className="font-tabular text-3xl font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold">{step.titleLabel}</h3>
                <p className="mt-2 text-sm text-muted">{step.descriptionLabel}</p>
              </li>
            ))}
          </ol>
        </GsapReveal>
      </section>

      <GsapReveal className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 data-reveal-item className="text-3xl font-bold">
          Наши изделия
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {IMAGES.gallery.map((src) => (
            <div
              key={src}
              data-reveal-item
              className="relative aspect-4/3 overflow-hidden rounded-xl border border-border"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      </GsapReveal>
    </>
  );
};

export default HomePage;
