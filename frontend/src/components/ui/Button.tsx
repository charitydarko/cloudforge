"use client";

import React from "react";
import Link from "next/link";

export interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Renders <a> (or Next <Link> for internal paths) instead of <button>. */
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

/**
 * CloudForge primary button. Renders <button> or, when `href` is set, a link.
 */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  href,
  target,
  rel,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    "cf-btn",
    `cf-btn--${variant}`,
    `cf-btn--${size}`,
    block ? "cf-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {leftIcon}
      {children != null && <span>{children}</span>}
      {rightIcon}
    </>
  );

  if (href && !disabled) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls} {...rest}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} target={target} rel={rel} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {inner}
    </button>
  );
}
