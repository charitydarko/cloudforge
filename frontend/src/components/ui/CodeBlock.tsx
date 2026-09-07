"use client";

import React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
  filename?: string;
  lang?: string;
}

/** Multi-line code block with an optional filename/lang bar. */
export function CodeBlock({
  code = "",
  filename,
  lang,
  className = "",
  ...rest
}: CodeBlockProps) {
  return (
    <div className={["cf-code", className].filter(Boolean).join(" ")} {...rest}>
      {(filename || lang) && (
        <div className="cf-code__bar">
          <span>{filename}</span>
          <span>{lang}</span>
        </div>
      )}
      <pre className="cf-code__body">
        <code>{code}</code>
      </pre>
    </div>
  );
}
