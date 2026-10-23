import { AppError, BadRequest } from "./errorClass.js";
import { createChirp, getAllChirps, getChirp, } from "../db/queries/chirp.js";
export const handleCreateChirp = async (req, res) => {
    const data = req.body;
    const profaneWordList = ["kerfuffle", "sharbert", "fornax"];
    if (!data["body"]) {
        throw new AppError("Unable to parse the body", 422);
    }
    if (data["body"].length > 140) {
        throw new BadRequest("Chirp is too long. Max length is 140");
    }
    for (const word of profaneWordList) {
        const regex = new RegExp(word, "gi");
        data["body"] = data["body"].replace(regex, "****");
    }
    const response = await createChirp(data);
    res.status(201).json({
        id: response.id,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        body: response.body,
        userId: response.userId,
    });
};
export const handleGetAllChirps = async (_req, res) => {
    const result = await getAllChirps();
    res.status(200).json(result);
};
export const handleGetChirp = async (req, res) => {
    const reqId = req.params.chirpId;
    const result = await getChirp(reqId);
    if (result.length === 0) {
        res.status(404).json({ msg: "no data associated to id" });
    }
    res.status(200).json(result[0]);
};
