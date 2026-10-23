import { Request, Response } from "express";

export const handlerReadiness = (req: Request, res: Response) => {
  res
    .header("Content-Type", "text/plain; charset=utf-8")
    .status(200)
    .send("OK");
};