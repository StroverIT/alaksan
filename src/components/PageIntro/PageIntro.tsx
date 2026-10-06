import type { FC } from "react";
import type { TPageIntroProps } from "./types";

export const PageIntro: FC<TPageIntroProps> = ({
  eyebrowLabel,
  titleLabel,
  descriptionLabel,
}) => {
  return (
    <header className="max-w-2xl">
      {eyebrowLabel ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrowLabel}
        </p>
      ) : null}
      <h1
        className={`text-3xl font-bold tracking-tight text-primary md:text-4xl ${eyebrowLabel ? "mt-2" : ""}`}
      >
        {titleLabel}
      </h1>
      {descriptionLabel ? (
        <p className="mt-3 text-base leading-relaxed text-muted">{descriptionLabel}</p>
      ) : null}
    </header>
  );
};
