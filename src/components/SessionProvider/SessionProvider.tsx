"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { FC, ReactNode } from "react";

type TSessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider: FC<TSessionProviderProps> = ({ children }) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
