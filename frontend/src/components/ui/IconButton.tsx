"use client";

import React from "react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  solid?: boolean;
}

/** Square, icon-only button. Pass an accessible `aria-label`. */
export function IconButton({
  size = "md",
  solid = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: IconButtonProps) {
  const cls = [
    "cf-iconbtn",
    `cf-iconbtn--${size}`,
    solid ? "cf-iconbtn--solid" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
