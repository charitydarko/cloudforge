"use client";

import React from "react";
import { Button } from "./Button";

export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

/** Modal dialog. Controlled via `open`/`onClose`. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: DialogProps) {
  if (!open) return null;
  return (
    <div className="cf-dialog-overlay" onClick={onClose}>
      <div
        className="cf-dialog"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div className="cf-dialog__header">
            {title && <h2 className="cf-dialog__title">{title}</h2>}
            {description && <p className="cf-dialog__desc">{description}</p>}
          </div>
        )}
        {children && <div className="cf-dialog__body">{children}</div>}
        <div className="cf-dialog__footer">
          {footer || (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
