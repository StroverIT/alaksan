"use client";

import Link from "next/link";
import type { FC } from "react";
import { VARIANT_CLASSES } from "./consts";
import type { TButtonLinkProps, TButtonProps } from "./types";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

export const Button: FC<TButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonLink: FC<TButtonLinkProps> = ({
  variant = "primary",
  className = "",
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};
