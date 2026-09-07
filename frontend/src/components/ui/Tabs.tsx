"use client";

import React from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

export interface TabsProps {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/** Underline tab bar. Controlled via `value`/`onChange`, or uncontrolled. */
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  className = "",
}: TabsProps) {
  const first = defaultValue ?? items[0]?.value;
  const [internal, setInternal] = React.useState(first);
  const active = value !== undefined ? value : internal;
  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  return (
    <div className={["cf-tabs", className].filter(Boolean).join(" ")} role="tablist">
      {items.map((it) => (
        <button
          type="button"
          key={it.value}
          role="tab"
          aria-selected={active === it.value}
          className={`cf-tab${active === it.value ? " cf-tab--active" : ""}`}
          onClick={() => select(it.value)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
