"use client";

import React from "react";
import Link from "next/link";
import { Box, Info, Search } from "lucide-react";
import { Badge, CodeBlock, CommandBlock } from "@/components/ui";
import "./docs.css";

const NAV = [
  { sec: "Getting started", items: ["Introduction", "Quickstart", "Configuration"] },
  { sec: "Deploy", items: ["Frontend", "API backend", "Database (RDS)"] },
  { sec: "Operate", items: ["Environments", "Observability", "Terraform eject"] },
];

const CLOUDFORGE_YML = `app: my-app
region: us-east-1
framework: nextjs
database:
  engine: postgres-15
  size: db.t4g.micro`;

export default function DocsPage() {
  const [active, setActive] = React.useState("Quickstart");
  return (
    <div className="docs theme-light">
      <aside className="dnav">
        <Link className="dbrand" href="/">
          <Box size={20} style={{ color: "var(--accent)" }} />
          Cloud<b>Forge</b>
        </Link>
        <div className="dsearch">
          <Search size={14} />
          Search docs
          <span style={{ marginLeft: "auto" }}>⌘K</span>
        </div>
        {NAV.map((s) => (
          <div key={s.sec}>
            <div className="dsec">{s.sec}</div>
            {s.items.map((it) => (
              <span
                key={it}
                className="dlink"
                data-active={active === it}
                onClick={() => setActive(it)}
              >
                {it}
              </span>
            ))}
          </div>
        ))}
      </aside>
      <main className="article">
        <div className="crumbs">
          Docs / Getting started /{" "}
          <span style={{ color: "var(--text-secondary)" }}>{active}</span>
        </div>
        <h1>{active}</h1>
        <p className="lead">
          Get a Next.js + Postgres app running on your own AWS account in under
          five minutes.
        </p>
        <div className="callout">
          <Info size={18} />
          <div>
            You&apos;ll need an AWS account and the CLI authenticated. CloudForge
            never stores your credentials — it uses your local AWS profile.
          </div>
        </div>
        <h2 id="install">1 · Install</h2>
        <p>
          Run CloudForge directly with <code>npx</code>, or install it globally.
        </p>
        <div className="blk">
          <CommandBlock command="npm install -g cloudforge" />
        </div>
        <h2 id="init">2 · Initialize</h2>
        <p>
          From your project root, create a <code>cloudforge.yml</code>.
          CloudForge detects your framework and suggests defaults.
        </p>
        <div className="blk">
          <CodeBlock filename="cloudforge.yml" lang="yaml" code={CLOUDFORGE_YML} />
        </div>
        <h2 id="deploy">3 · Deploy</h2>
        <p>
          One command provisions infrastructure, runs migrations, and ships your
          build.
        </p>
        <div className="blk">
          <CommandBlock command="cloudforge deploy" />
        </div>
        <p>
          When it finishes you&apos;ll get a live URL.{" "}
          <Badge tone="success" dot>
            Live
          </Badge>{" "}
          Every push to <code>main</code> redeploys automatically.
        </p>
        <div className="pager">
          <div className="pcard" onClick={() => setActive("Introduction")}>
            <div className="k">← Previous</div>
            <div className="v">Introduction</div>
          </div>
          <div
            className="pcard"
            style={{ textAlign: "right" }}
            onClick={() => setActive("Configuration")}
          >
            <div className="k">Next →</div>
            <div className="v">Configuration</div>
          </div>
        </div>
      </main>
      <nav className="toc">
        <div className="toc__t">On this page</div>
        <a href="#install">1 · Install</a>
        <a href="#init">2 · Initialize</a>
        <a href="#deploy">3 · Deploy</a>
      </nav>
    </div>
  );
}
