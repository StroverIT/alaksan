import type { TSiteIconName } from "./types";

export const ICON_PATHS: Record<TSiteIconName, readonly string[]> = {
  precision: [
    "M12 3v3",
    "M12 18v3",
    "M3 12h3",
    "M18 12h3",
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
  ],
  delivery: [
    "M3 7h11v8H3z",
    "M14 10h4l3 3v2h-7",
    "M7 18.5a1.5 1.5 0 1 0 0.01 0",
    "M17 18.5a1.5 1.5 0 1 0 0.01 0",
  ],
  custom: ["M4 8h16v8H4z", "M8 8v3", "M12 8v4", "M16 8v3"],
  quality: ["M12 3l7 3v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V6z", "M9 12l2 2 4-4"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  phone: ["M6 4h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z"],
  pin: [
    "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z",
    "M12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  ],
  check: ["M5 12l5 5L20 7"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
};

export const DEFAULT_ICON_CLASS = "h-5 w-5";
