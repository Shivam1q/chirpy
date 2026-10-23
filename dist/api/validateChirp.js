import { AppError, BadRequest } from "./errorClass.js";
export const handlerAcceptJSONData = async (req, res) => {
    const profaneWordList = ["kerfuffle", "sharbert", "fornax"];
    const paramBody = req.body;
    if (!paramBody["body"]) {
        throw new AppError("Unable to parse the body", 422);
    }
    if (paramBody["body"].length > 140) {
        throw new BadRequest("Chirp is too long. Max length is 140");
    }
    for (const word of profaneWordList) {
        const regex = new RegExp(word, "gi");
        paramBody["body"] = paramBody["body"].replace(regex, "****");
    }
    res.status(200).json({ cleanedBody: paramBody["body"] });
};
