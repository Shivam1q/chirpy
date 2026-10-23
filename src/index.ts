import express, { NextFunction, Request, Response } from "express";
import { config } from "./config.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware.js";
import { handlerReadiness } from "./api/health.js";
import { handlerMetrics } from "./api/admin/metrics.js";
import { handleResetConfig } from "./api/admin/reset.js";
import { handlerCreateUser } from "./api/users.js";
import { errorHandler } from "./api/globalErrorHandler.js";
import { handleCreateChirp, handleGetAllChirps, handleGetChirp } from "./api/chirp.js";

const migrationClient = postgres(config.db.url, { max: 1 });
try {
  await migrate(drizzle(migrationClient), config.db.migrationConfig);
} finally {
  await migrationClient.end();
}

const app = express();

app.use(express.json());

const PORT = config.api.port ?? 8080;

app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handleResetConfig);
app.post("/api/users", handlerCreateUser);
app.post("/api/chirps", handleCreateChirp);
app.get("/api/chirps", handleGetAllChirps);
app.get("/api/chirps/:chirpId", handleGetChirp);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});
