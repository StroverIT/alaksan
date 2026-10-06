import type { TButtonVariant } from "./types";

export const VARIANT_CLASSES: Record<TButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary:
    "bg-surface text-foreground border border-border hover:border-primary/30 hover:bg-background",
  accent:
    "bg-accent text-primary-foreground hover:bg-accent/90 shadow-sm",
  ghost: "text-foreground hover:bg-accent-muted/40",
};
