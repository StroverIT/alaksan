import type { ReactNode } from "react";

export type TGsapRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
};

export type TUseGsapScrollOptions = {
  stagger?: number;
  y?: number;
};
