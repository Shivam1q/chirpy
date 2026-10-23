import { Request, Response } from "express";
import { config } from "../../config.js";

export const handlerMetrics = (req: Request, res: Response) => {
  res
    .status(200)
    .set("Content-Type", "text/html; charset=utf-8")
    .send(
      `<html>
      <body>
        <h1>Welcome, Chirpy Admin</h1>
        <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
      </body>
    </html>`,
    );
};