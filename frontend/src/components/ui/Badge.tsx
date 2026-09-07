"use client";

import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  solid?: boolean;
  dot?: boolean;
}

/** Compact status/label pill. */
export function Badge({
  tone = "neutral",
  solid = false,
  dot = false,
  className = "",
  children,
  ...rest
}: BadgeProps) {
  const cls = [
    "cf-badge",
    `cf-badge--${tone}`,
    solid ? "cf-badge--solid" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {dot && <span className="cf-badge__dot" />}
      {children}
    </span>
  );
}
