"use client";

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  pad?: boolean;
}

function CardRoot({
  hover = false,
  pad = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const cls = [
    "cf-card",
    hover ? "cf-card--hover" : "",
    pad ? "cf-card--pad" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

function CardHeader({
  title,
  action,
  children,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="cf-card__header">
      {title ? <h3 className="cf-card__title">{title}</h3> : children}
      {action}
    </div>
  );
}

function CardBody({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={["cf-card__body", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

function CardFooter({ children }: { children?: React.ReactNode }) {
  return <div className="cf-card__footer">{children}</div>;
}

/** Surface container. Compose with Card.Header/Body/Footer or use `pad`. */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
