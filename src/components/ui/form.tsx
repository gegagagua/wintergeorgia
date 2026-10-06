"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const inputBase =
  "block w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-muted " +
  "shadow-[inset_0_1px_0_rgba(14,22,32,0.03)] " +
  "transition-[border-color,box-shadow,background-color] duration-150 " +
  "hover:border-ink-muted/60 " +
  "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
  optional,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-small font-medium text-ink">
        {label}
        {optional ? <span className="text-small font-normal text-ink-muted">— optional</span> : null}
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
  return <textarea className={cn(inputBase, "min-h-28 resize-y leading-6", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          inputBase,
          "appearance-none pr-9 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7C89%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
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
              "flex cursor-pointer items-start gap-3 rounded-md border p-3.5 transition-[border-color,background-color,box-shadow] duration-150",
              checked
                ? "border-primary bg-primary/[0.06] shadow-[0_0_0_3px_rgba(44,127,168,0.12)]"
                : "border-line hover:border-ink-muted/60 hover:bg-surface-raised",
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
