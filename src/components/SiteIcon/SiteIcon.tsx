import type { FC } from "react";
import { DEFAULT_ICON_CLASS, ICON_PATHS } from "./consts";
import type { TSiteIconProps } from "./types";

export const SiteIcon: FC<TSiteIconProps> = ({
  name,
  className = DEFAULT_ICON_CLASS,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICON_PATHS[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
};
