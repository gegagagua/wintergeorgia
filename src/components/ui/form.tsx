"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const inputBase =
  "block w-full rounded-sm border border-line bg-surface px-3 py-2 text-ink placeholder:text-ink-muted " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-small font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="text-small text-ink-muted">{hint}</p> : null}
      {error ? <p className="text-small text-status-closed">{error}</p> : null}
    </div>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(inputBase, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn(inputBase, "min-h-24", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <select className={cn(inputBase, "pr-8", className)} {...rest}>
      {children}
    </select>
  );
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  className,
}: {
  name: string;
  options: { value: string; label: string; hint?: string }[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)} role="radiogroup">
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-sm border p-3 transition-colors",
              checked ? "border-primary bg-primary/5" : "border-line hover:border-primary-hover",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={checked}
              onChange={() => onChange?.(o.value)}
              className="mt-1 h-4 w-4 accent-[color:var(--primary)]"
            />
            <span>
              <span className="block text-ink">{o.label}</span>
              {o.hint ? <span className="mt-0.5 block text-small text-ink-muted">{o.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function Checkbox({
  label,
  hint,
  className,
  ...rest
}: ComponentProps<"input"> & { label: string; hint?: string }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input type="checkbox" className="mt-1 h-4 w-4 accent-[color:var(--primary)]" {...rest} />
      <span>
        <span className="block text-ink">{label}</span>
        {hint ? <span className="mt-0.5 block text-small text-ink-muted">{hint}</span> : null}
      </span>
    </label>
  );
}
