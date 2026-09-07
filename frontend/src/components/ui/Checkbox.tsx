"use client";

import React from "react";

export interface CheckboxProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange"> {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

/** Controlled/uncontrolled checkbox with label. */
export function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  ...rest
}: CheckboxProps) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal((v) => !v);
    onChange?.(!on);
  };
  return (
    <span
      className="cf-check"
      data-checked={on}
      data-disabled={disabled}
      onClick={toggle}
      role="checkbox"
      aria-checked={on}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
      {...rest}
    >
      <span className="cf-check__box">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent-fg)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {label && <span>{label}</span>}
    </span>
  );
}
