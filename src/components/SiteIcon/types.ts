export type TSiteIconName =
  | "precision"
  | "delivery"
  | "custom"
  | "quality"
  | "menu"
  | "close"
  | "phone"
  | "pin"
  | "check"
  | "arrow";

export type TSiteIconProps = {
  name: TSiteIconName;
  className?: string;
};
