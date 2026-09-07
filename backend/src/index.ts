import express, { type Request, type Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Liveness/readiness probe used by Docker HEALTHCHECK and load balancers.
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ service: "cloudforge-api", version: "0.1.0" });
});

const server = app.listen(PORT, () => {
  console.log(`cloudforge-api listening on :${PORT}`);
});

// Graceful shutdown so `docker compose down` / restarts exit cleanly.
const shutdown = (signal: string) => {
  console.log(`received ${signal}, shutting down`);
  server.close(() => process.exit(0));
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
