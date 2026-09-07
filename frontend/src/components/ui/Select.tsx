"use client";

import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
}

/** Native select styled to match CloudForge inputs. */
export function Select({
  label,
  hint,
  id,
  className = "",
  children,
  ...rest
}: SelectProps) {
  const selId =
    id || (label ? `cf-sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div className="cf-field">
      {label && (
        <label className="cf-label" htmlFor={selId}>
          {label}
        </label>
      )}
      <select
        id={selId}
        className={["cf-select", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </select>
      {hint && <span className="cf-hint">{hint}</span>}
    </div>
  );
}
