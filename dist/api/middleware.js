import { config } from "../config.js";
export const middlewareLogResponses = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode > 299 || res.statusCode < 200)
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
    });
    next();
};
export const middlewareMetricsInc = (req, res, next) => {
    config.api.fileserverHits += 1;
    next();
};
