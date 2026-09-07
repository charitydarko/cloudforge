"use client";

import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowLeft,
  Bell,
  BookOpen,
  Box,
  ChevronRight,
  Database,
  ExternalLink,
  Globe,
  KeyRound,
  LayoutDashboard,
  Plus,
  Rocket,
  RotateCcw,
  ScrollText,
  Settings,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  IconButton,
  Input,
  StatusDot,
  type StatusDotStatus,
  Tabs,
  Tag,
} from "@/components/ui";
import { GithubIcon } from "@/components/icons/GithubIcon";
import "./dashboard.css";

/* ---------------- Data model ---------------- */

interface Deployment {
  name: string;
  env: "production" | "preview";
  status: StatusDotStatus;
  branch: string;
  meta: string;
}

const DEPLOYMENTS: Deployment[] = [
  { name: "storefront", env: "production", status: "live", branch: "main@a1c9f2e", meta: "Deployed 4m ago · 12.4s build" },
  { name: "storefront", env: "preview", status: "building", branch: "pr-142@8b3d0a1", meta: "Building frontend… · 0:38" },
  { name: "api-gateway", env: "production", status: "live", branch: "main@f77c210", meta: "Deployed 2h ago · 24.1s build" },
  { name: "marketing-site", env: "production", status: "live", branch: "main@d902ee4", meta: "Deployed yesterday · 9.7s build" },
  { name: "admin", env: "preview", status: "error", branch: "pr-139@3a1b8c2", meta: "Build failed · migration error" },
];

const NAV: { group: string; items: { id: string; label: string; icon: LucideIcon }[] }[] = [
  {
    group: "Platform",
    items: [
      { id: "deployments", label: "Deployments", icon: Rocket },
      { id: "databases", label: "Databases", icon: Database },
      { id: "logs", label: "Logs", icon: ScrollText },
      { id: "analytics", label: "Analytics", icon: Activity },
    ],
  },
  {
    group: "Project",
    items: [
      { id: "env", label: "Env Vars", icon: KeyRound },
      { id: "domains", label: "Domains", icon: Globe },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

/* ---------------- Chrome ---------------- */

function Sidebar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <aside className="side">
      <Link className="side__brand" href="/" style={{ color: "inherit" }}>
        <Box size={20} style={{ color: "var(--accent)" }} />
        Cloud<b>Forge</b>
      </Link>
      {NAV.map((sec) => (
        <div key={sec.group}>
          <div className="navsec">{sec.group}</div>
          {sec.items.map((it) => (
            <div
              key={it.id}
              className="navitem"
              data-active={active === it.id}
              onClick={() => onNav(it.id)}
            >
              <it.icon />
              {it.label}
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "auto", padding: 10 }}>
        <StatusDot status="live" label="All systems operational" />
      </div>
    </aside>
  );
}

function Topbar({ crumb, onLogout }: { crumb: React.ReactNode; onLogout: () => void }) {
  return (
    <div className="top">
      <span className="crumb">{crumb}</span>
      <div className="top__r">
        <IconButton aria-label="Docs">
          <BookOpen size={18} />
        </IconButton>
        <IconButton aria-label="Notifications">
          <Bell size={18} />
        </IconButton>
        <div className="avatar" onClick={onLogout} title="Sign out" style={{ cursor: "pointer" }}>
          CD
        </div>
      </div>
    </div>
  );
}

/* ---------------- Login ---------------- */

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="login">
      <div className="login__card">
        <Link className="login__brand" href="/" style={{ color: "inherit" }}>
          <Box size={24} style={{ color: "var(--accent)" }} />
          Cloud<b>Forge</b>
        </Link>
        <div className="login__sub">Deploy Next.js + Postgres to AWS in one command.</div>
        <Card pad>
          <div className="fieldgap">
            <Input label="Email" type="email" defaultValue="charity@cloudforge.dev" />
            <Input label="Password" type="password" defaultValue="••••••••••" />
            <Button variant="primary" block onClick={onLogin}>
              Sign in
            </Button>
          </div>
          <div className="divider">or</div>
          <Button variant="secondary" block leftIcon={<GithubIcon size={16} />} onClick={onLogin}>
            Continue with GitHub
          </Button>
        </Card>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--text-faint)" }}>
          New here?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Deployments list ---------------- */

function DeploymentsScreen({ onOpen }: { onOpen: (d: Deployment) => void }) {
  return (
    <div className="content">
      <div className="row-between">
        <div>
          <h1 className="h1">Deployments</h1>
          <p className="sub">5 projects across us-east-1 · eu-west-1</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />}>
          New deployment
        </Button>
      </div>
      <div className="grid3">
        <div className="stat">
          <div className="stat__k">Live deploys</div>
          <div className="stat__v">3</div>
        </div>
        <div className="stat">
          <div className="stat__k">Avg build</div>
          <div className="stat__v">14.9s</div>
        </div>
        <div className="stat">
          <div className="stat__k">Monthly cost</div>
          <div className="stat__v">$42.10</div>
        </div>
      </div>
      <div className="deps">
        {DEPLOYMENTS.map((d, i) => (
          <div className="dep" key={i} onClick={() => onOpen(d)}>
            <StatusDot status={d.status} />
            <div>
              <div className="dep__name">
                {d.name}{" "}
                <Badge tone={d.env === "production" ? "accent" : "info"} style={{ marginLeft: 6 }}>
                  {d.env}
                </Badge>
              </div>
              <div className="dep__meta">{d.meta}</div>
            </div>
            <div className="dep__branch">{d.branch}</div>
            <ChevronRight size={18} style={{ color: "var(--text-faint)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Deploy detail (tabs incl. logs terminal) ---------------- */

function EnvVarsTab() {
  const [keys, setKeys] = React.useState([
    "DATABASE_URL",
    "AWS_REGION",
    "NEXT_PUBLIC_API_URL",
    "SESSION_SECRET",
    "STRIPE_KEY",
  ]);
  return (
    <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 10 }}>
      {keys.map((k) => (
        <Tag key={k} onRemove={() => setKeys((prev) => prev.filter((p) => p !== k))}>
          {k}
        </Tag>
      ))}
      <Button variant="ghost" size="sm" leftIcon={<Plus size={15} />}>
        Add variable
      </Button>
    </div>
  );
}

function DeployDetail({ dep }: { dep: Deployment }) {
  const [tab, setTab] = React.useState("overview");
  return (
    <div className="content">
      <div className="row-between">
        <div>
          <h1 className="h1">{dep.name}</h1>
          <p className="sub" style={{ fontFamily: "var(--font-mono)" }}>
            {dep.branch} · {dep.env}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="secondary" leftIcon={<ExternalLink size={16} />}>
            Visit
          </Button>
          <Button variant="secondary" leftIcon={<RotateCcw size={16} />}>
            Rollback
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "overview", label: "Overview" },
            { value: "logs", label: "Build Logs" },
            { value: "env", label: "Env Vars" },
          ]}
        />
      </div>
      {tab === "overview" && (
        <div className="grid3">
          <div className="stat">
            <div className="stat__k">Status</div>
            <div className="stat__v" style={{ fontSize: 18, marginTop: 12 }}>
              <StatusDot status={dep.status} label={dep.status} />
            </div>
          </div>
          <div className="stat">
            <div className="stat__k">Region</div>
            <div className="stat__v" style={{ fontSize: 18, fontFamily: "var(--font-mono)", marginTop: 14 }}>
              us-east-1
            </div>
          </div>
          <div className="stat">
            <div className="stat__k">Framework</div>
            <div className="stat__v" style={{ fontSize: 18, marginTop: 14 }}>
              Next.js 15
            </div>
          </div>
        </div>
      )}
      {tab === "logs" && (
        <div className="term">
          <div>
            <span className="g">$</span> cloudforge deploy --env {dep.env}
          </div>
          <div className="d">→ resolving cloudforge.yml</div>
          <div className="d">→ provisioning us-east-1 · vpc-0a1b · rds postgres-15</div>
          <div>
            <span className="c">◆</span> installing dependencies <span className="d">(pnpm) 6.2s</span>
          </div>
          <div>
            <span className="c">◆</span> building next.js app <span className="d">4.8s</span>
          </div>
          <div>
            <span className="g">✓</span> uploaded 42 static assets to S3 + CloudFront
          </div>
          <div>
            <span className="g">✓</span> database migrations applied <span className="d">(3 pending → 0)</span>
          </div>
          <div>
            <span className="g">✓</span> deployment live{" "}
            <span className="c">https://{dep.name}.cloudforge.app</span>
          </div>
          <div className="d">done in 12.4s</div>
        </div>
      )}
      {tab === "env" && <EnvVarsTab />}
    </div>
  );
}

/* ---------------- Empty section placeholder ---------------- */

function EmptyScreen({ name }: { name: string }) {
  return (
    <div className="content">
      <h1 className="h1" style={{ textTransform: "capitalize" }}>
        {name}
      </h1>
      <p className="sub">This section is part of the CloudForge dashboard.</p>
      <div
        style={{
          marginTop: 40,
          display: "grid",
          placeItems: "center",
          height: 280,
          color: "var(--text-faint)",
          border: "1px dashed var(--border-default)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <LayoutDashboard size={32} style={{ margin: "0 auto" }} />
          <div style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 13 }}>
            {name} view
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- App state machine ---------------- */

export default function DashboardPage() {
  const [authed, setAuthed] = React.useState(false);
  const [nav, setNav] = React.useState("deployments");
  const [detail, setDetail] = React.useState<Deployment | null>(null);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  let crumb: React.ReactNode = (
    <>
      CloudForge / <b>Deployments</b>
    </>
  );
  let screen: React.ReactNode;
  if (detail) {
    crumb = (
      <>
        CloudForge / Deployments / <b>{detail.name}</b>
      </>
    );
    screen = <DeployDetail dep={detail} />;
  } else if (nav === "deployments") {
    screen = <DeploymentsScreen onOpen={setDetail} />;
  } else {
    crumb = (
      <>
        CloudForge / <b>{nav.charAt(0).toUpperCase() + nav.slice(1)}</b>
      </>
    );
    screen = <EmptyScreen name={nav} />;
  }

  return (
    <div className="app">
      <Sidebar
        active={detail ? "deployments" : nav}
        onNav={(id) => {
          setDetail(null);
          setNav(id);
        }}
      />
      <div className="main">
        <Topbar
          crumb={crumb}
          onLogout={() => {
            setAuthed(false);
            setDetail(null);
            setNav("deployments");
          }}
        />
        {detail && (
          <div style={{ padding: "14px 32px 0" }}>
            <button className="backlink" onClick={() => setDetail(null)}>
              <ArrowLeft size={15} /> back to deployments
            </button>
          </div>
        )}
        {screen}
      </div>
    </div>
  );
}
