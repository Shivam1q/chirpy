import { Request, Response } from "express";
import { createUser } from "../db/queries/users.js";

export const handlerCreateUser = async (req: Request, res: Response) => {
  type dataEmail = {
    email: string;
  };

  type resObj = {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };

  const reqData: dataEmail = req.body;

  const responseObject: resObj = await createUser(reqData);

  res.status(201).json({
    id: responseObject.id,
    email: responseObject.email,
    createdAt: responseObject.createdAt,
    updatedAt: responseObject.updatedAt,
  });
};
