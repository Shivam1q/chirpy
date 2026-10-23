import { AppError } from "./errorClass.js";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        console.log("CRITICAL BUG: ", err);
        res.status(500).json({ error: "Something horribly went wrong" });
    }
};
