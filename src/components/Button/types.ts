import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TButtonVariant = "primary" | "secondary" | "accent" | "ghost";

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TButtonVariant;
  children: ReactNode;
  asChild?: false;
};

export type TButtonLinkProps = {
  variant?: TButtonVariant;
  children: ReactNode;
  href: string;
  className?: string;
};
