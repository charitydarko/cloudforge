"use client";

import React from "react";

export type StatusDotStatus = "live" | "idle" | "error" | "building";

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusDotStatus;
  label?: React.ReactNode;
}

/** Labelled connection/build status indicator. */
export function StatusDot({
  status = "idle",
  label,
  className = "",
  ...rest
}: StatusDotProps) {
  const cls = ["cf-dot", `cf-dot--${status}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      <span className="cf-dot__i" />
      {label && <span>{label}</span>}
    </span>
  );
}
