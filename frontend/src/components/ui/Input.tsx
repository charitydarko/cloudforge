"use client";

import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "required"> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  mono?: boolean;
}

/** Text input with optional label, hint, and error state. */
export function Input({
  label,
  hint,
  error,
  required = false,
  mono = false,
  id,
  className = "",
  ...rest
}: InputProps) {
  const inputId =
    id || (label ? `cf-in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const inputCls = [
    "cf-input",
    mono ? "cf-input--mono" : "",
    error ? "cf-input--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="cf-field">
      {label && (
        <label className="cf-label" htmlFor={inputId}>
          {label}
          {required && <span className="cf-label__req">*</span>}
        </label>
      )}
      <input id={inputId} className={inputCls} aria-invalid={!!error} {...rest} />
      {(error || hint) && (
        <span className={`cf-hint${error ? " cf-hint--error" : ""}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
