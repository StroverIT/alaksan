"use client";

import Button from "@/components/Button";
import { IMAGES } from "@/consts";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { CONTENT, REDIRECT_PATH, SITE_HOME_PATH } from "./consts";

export const AdminLoginForm: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(CONTENT.errorToastLabel);
      return;
    }

    router.push(REDIRECT_PATH);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-sm md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-accent to-transparent"
      />

      <div className="flex items-center gap-3">
        <Image
          src={IMAGES.logo}
          alt={CONTENT.brandLabel}
          width={48}
          height={48}
          className="h-12 w-12 rounded-xl object-cover ring-1 ring-border"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary">
            {CONTENT.brandLabel}
          </p>
          <p className="text-xs text-muted">{CONTENT.panelLabel}</p>
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-primary">
        {CONTENT.titleLabel}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{CONTENT.subtitleLabel}</p>

      <label className="mt-8 block text-sm">
        <span className="font-medium text-foreground">{CONTENT.emailLabel}</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          placeholder={CONTENT.emailPlaceholderLabel}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted/50 focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
        />
      </label>

      <label className="mt-4 block text-sm">
        <span className="font-medium text-foreground">{CONTENT.passwordLabel}</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          placeholder={CONTENT.passwordPlaceholderLabel}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted/50 focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
        />
      </label>

      <Button type="submit" variant="accent" className="mt-8 w-full py-3.5" disabled={loading}>
        {loading ? CONTENT.loadingLabel : CONTENT.submitLabel}
      </Button>

      <p className="mt-6 text-center text-sm">
        <Link href={SITE_HOME_PATH} className="text-muted transition hover:text-accent">
          {CONTENT.backToSiteLabel}
        </Link>
      </p>
    </form>
  );
};
