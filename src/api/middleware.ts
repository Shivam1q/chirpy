import { NextFunction, Request, Response } from "express";
import { config } from "../config.js";

export const middlewareLogResponses = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on("finish", () => {
    if (res.statusCode > 299 || res.statusCode < 200)
      console.log(
        `[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`,
      );
  });

  next();
};

export const middlewareMetricsInc = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.api.fileserverHits += 1;
  next();
};