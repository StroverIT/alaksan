import type { ReactNode } from "react";

export type TGsapRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  group?: boolean;
};

export type TUseGsapScrollOptions = {
  stagger?: number;
  y?: number;
};
