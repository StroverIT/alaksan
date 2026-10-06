"use client";

import Button from "@/components/Button";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { CONTENT, SOURCE } from "./consts";
import type { TContactInquiryFormProps } from "./types";

export const ContactInquiryForm: FC<TContactInquiryFormProps> = ({
  source = SOURCE,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>(CONTENT.interestOptions[2].value);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          interest,
          message,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error("failed");
      }

      setName("");
      setEmail("");
      setPhone("");
      setInterest(CONTENT.interestOptions[2].value);
      setMessage("");
      toast.success(CONTENT.successLabel);
    } catch {
      toast.error(CONTENT.errorLabel);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold tracking-tight text-primary">
        {CONTENT.titleLabel}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {CONTENT.descriptionLabel}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          {CONTENT.nameLabel}
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="field"
          />
        </label>
        <label className="block text-sm">
          {CONTENT.phoneLabel}
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="field"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          {CONTENT.emailLabel}
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          {CONTENT.interestLabel}
          <select
            name="interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className="field"
          >
            {CONTENT.interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          {CONTENT.messageLabel}
          <textarea
            required
            name="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={CONTENT.messagePlaceholderLabel}
            className="field min-h-32 resize-y"
          />
        </label>
      </div>

      <Button
        type="submit"
        variant="accent"
        className="mt-6 w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? CONTENT.submittingLabel : CONTENT.submitLabel}
      </Button>
    </form>
  );
};
