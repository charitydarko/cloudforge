"use client";

import React from "react";

export interface CommandBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  command: string;
  prompt?: string;
}

/** Copyable single-line terminal command. */
export function CommandBlock({
  command,
  prompt = "$",
  className = "",
  ...rest
}: CommandBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    try {
      navigator.clipboard?.writeText(command);
    } catch {
      /* clipboard unavailable — the command stays selectable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className={["cf-cmd", className].filter(Boolean).join(" ")} {...rest}>
      <span className="cf-cmd__prompt">{prompt}</span>
      <span className="cf-cmd__text">{command}</span>
      <button
        type="button"
        className="cf-iconbtn cf-iconbtn--sm cf-cmd__copy"
        aria-label="Copy command"
        onClick={copy}
      >
        {copied ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
