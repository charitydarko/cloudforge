"use client";

import React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
}

/** Small removable token/tag. */
export function Tag({ onRemove, className = "", children, ...rest }: TagProps) {
  const cls = ["cf-tag", !onRemove ? "cf-tag--plain" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
      {onRemove && (
        <button
          type="button"
          className="cf-tag__x"
          aria-label="Remove"
          onClick={onRemove}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}
