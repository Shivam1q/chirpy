import { createUser } from "../db/queries/users.js";
export const handlerCreateUser = async (req, res) => {
    const reqData = req.body;
    const responseObject = await createUser(reqData);
    res.status(201).json({
        id: responseObject.id,
        email: responseObject.email,
        createdAt: responseObject.createdAt,
        updatedAt: responseObject.updatedAt,
    });
};
