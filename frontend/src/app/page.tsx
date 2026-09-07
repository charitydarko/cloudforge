import Link from "next/link";
import {
  Activity,
  BookOpen,
  Box,
  Boxes,
  Database,
  GitBranch,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge, Button, CommandBlock } from "@/components/ui";
import { GithubIcon } from "@/components/icons/GithubIcon";
import "./marketing.css";

const GITHUB_URL = "https://github.com/charitydarko/cloudforge";

const FEATURES = [
  {
    icon: Zap,
    title: "One command",
    desc: "npx cloudforge deploy provisions VPC, RDS, S3, and CloudFront — no console clicking.",
  },
  {
    icon: Database,
    title: "Postgres, production-ready",
    desc: "Managed RDS with automated migrations, backups, and connection pooling out of the box.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    desc: "Least-privilege IAM, private subnets, and encrypted secrets from episode one.",
  },
  {
    icon: GitBranch,
    title: "Preview per PR",
    desc: "Every pull request gets an isolated preview environment that tears down on merge.",
  },
  {
    icon: Activity,
    title: "Observability built in",
    desc: "Structured logs, metrics, and deploy history without wiring up a third-party stack.",
  },
  {
    icon: Boxes,
    title: "Terraform capstone",
    desc: "Eject to plain Terraform anytime. No lock-in — the infrastructure is yours.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect",
    desc: "Point CloudForge at your repo and AWS account. It reads your framework automatically.",
  },
  {
    n: "02",
    title: "Deploy",
    desc: "One command provisions infrastructure, runs migrations, and ships your build.",
  },
  {
    n: "03",
    title: "Ship on push",
    desc: "Merge to main and CloudForge redeploys. Open a PR and get a preview URL.",
  },
];

export default function Home() {
  return (
    <div className="mk">
      <div className="wrap">
        <nav className="nav">
          <Link className="brand" href="/" style={{ color: "inherit" }}>
            <Box size={20} style={{ color: "var(--accent)" }} />
            Cloud<b>Forge</b>
          </Link>
          <div className="nav__links">
            <a href="#features">Product</a>
            <Link href="/docs">Docs</Link>
            <a href="#pricing">Pricing</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              Blog
            </a>
          </div>
          <div className="nav__r">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <GithubIcon size={16} />
              4.2k
            </a>
            <Button variant="secondary" size="sm" href="/dashboard">
              Sign in
            </Button>
            <Button variant="primary" size="sm" href="/dashboard">
              Start free
            </Button>
          </div>
        </nav>
      </div>

      <header className="hero">
        <div className="wrap">
          <div className="eyebrow">Open source · Built in public</div>
          <h1>
            Deploy Next.js + Postgres to AWS in{" "}
            <span className="accent">one command</span>.
          </h1>
          <p>
            CloudForge turns your app into production AWS infrastructure — VPC,
            RDS, CDN, secrets — with a single command and zero lock-in.
          </p>
          <div className="hero__cmd">
            <CommandBlock command="npx cloudforge deploy" />
          </div>
          <div className="hero__cta">
            <Button
              variant="primary"
              size="lg"
              href="/dashboard"
              leftIcon={<Rocket size={18} />}
            >
              Deploy your app
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/docs"
              leftIcon={<BookOpen size={18} />}
            >
              Read the docs
            </Button>
          </div>
          <div className="hero__note">
            MIT licensed · No credit card · Ejectable to Terraform
          </div>
        </div>
      </header>

      <section className="section" id="features" style={{ scrollMarginTop: 20 }}>
        <div className="wrap">
          <div className="section__head">
            <h2>Everything production needs. None of the YAML.</h2>
            <p>
              Six episodes of infrastructure decisions, documented and packaged
              into one tool.
            </p>
          </div>
          <div className="features">
            {FEATURES.map((f) => (
              <div className="feat" key={f.title}>
                <div className="feat__i">
                  <f.icon size={20} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section__head">
            <h2>From git push to live URL</h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="step__n">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="pills">
            <Badge tone="neutral" dot>
              us-east-1
            </Badge>
            <Badge tone="neutral" dot>
              eu-west-1
            </Badge>
            <Badge tone="accent">Next.js 15</Badge>
            <Badge tone="accent">Postgres 15</Badge>
            <Badge tone="info">Terraform</Badge>
          </div>
        </div>
      </section>

      <div className="wrap" id="pricing" style={{ scrollMarginTop: 20 }}>
        <div className="cta">
          <h2>Ship your first app tonight.</h2>
          <p>Free while you build. Pay only for the AWS you use.</p>
          <div className="hero__cmd" style={{ margin: "0 auto" }}>
            <CommandBlock command="npx cloudforge deploy" />
          </div>
        </div>
      </div>

      <div className="wrap">
        <footer className="foot">
          <Link
            className="brand"
            href="/"
            style={{ fontSize: 15, color: "inherit" }}
          >
            <Box size={16} style={{ color: "var(--accent)" }} />
            Cloud<b>Forge</b>
          </Link>
          <span>MIT © 2026 Charity Darko</span>
          <div className="foot__links">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/docs">Docs</Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              Series
            </a>
            <a href="#">Status</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
