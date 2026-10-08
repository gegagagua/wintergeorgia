"use client";

import type { ChangeEvent, ComponentProps, ReactNode } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { cn } from "@/lib/cn";

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

type NativeInputProps = ComponentProps<"input">;

export function Input({
  className,
  min,
  max,
  step,
  minLength,
  maxLength,
  pattern,
  size: _size,
  type,
  ...rest
}: NativeInputProps) {
  return (
    <TextField
      type={type}
      variant="outlined"
      size="small"
      fullWidth
      className={cn(className)}
      slotProps={{
        htmlInput: { min, max, step, minLength, maxLength, pattern },
      }}
      {...(rest as Omit<TextFieldProps, "variant" | "size" | "fullWidth" | "slotProps" | "type">)}
    />
  );
}

type NativeTextareaProps = ComponentProps<"textarea">;

export function Textarea({
  className,
  rows,
  minLength,
  maxLength,
  ...rest
}: NativeTextareaProps) {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      multiline
      minRows={rows ?? 4}
      className={cn(className)}
      slotProps={{
        htmlInput: { minLength, maxLength },
      }}
      {...(rest as unknown as Omit<TextFieldProps, "variant" | "size" | "fullWidth" | "multiline" | "minRows" | "slotProps">)}
    />
  );
}

type NativeSelectProps = ComponentProps<"select">;

export function Select({ className, children, size: _size, ...rest }: NativeSelectProps) {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      select
      className={cn(className)}
      slotProps={{ select: { native: true } }}
      {...(rest as unknown as Omit<TextFieldProps, "variant" | "size" | "fullWidth" | "select" | "slotProps" | "children">)}
    >
      {children}
    </TextField>
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
    <MuiRadioGroup
      name={name}
      value={value ?? ""}
      onChange={(_, v) => onChange?.(v)}
      className={cn("grid gap-2", className)}
    >
      {options.map((o) => {
        const checked = value === o.value;
        return (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-start gap-2 rounded-md border p-3.5 transition-[border-color,background-color,box-shadow] duration-150",
              checked
                ? "border-primary bg-primary/[0.06] shadow-[0_0_0_3px_rgba(44,127,168,0.12)]"
                : "border-line hover:border-ink-muted/60 hover:bg-surface-raised",
            )}
          >
            <MuiRadio value={o.value} size="small" sx={{ p: 0.5, mt: "2px" }} />
            <span>
              <span className="block text-ink">{o.label}</span>
              {o.hint ? <span className="mt-0.5 block text-small text-ink-muted">{o.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </MuiRadioGroup>
  );
}

export function Checkbox({
  label,
  hint,
  className,
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  disabled,
  id,
}: Omit<ComponentProps<"input">, "type"> & { label: string; hint?: string }) {
  return (
    <FormControlLabel
      className={cn("items-start", className)}
      sx={{ ml: 0, alignItems: "flex-start" }}
      control={
        <MuiCheckbox
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange as unknown as (e: ChangeEvent<HTMLInputElement>) => void}
          size="small"
          sx={{ p: 0.5, mt: "2px" }}
        />
      }
      label={
        <span>
          <span className="block text-ink">{label}</span>
          {hint ? <span className="mt-0.5 block text-small text-ink-muted">{hint}</span> : null}
        </span>
      }
    />
  );
}
