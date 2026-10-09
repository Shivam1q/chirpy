import express from "express";
import { config } from "./config.js";
const app = express();
const PORT = 8080;
const middlewareLogResponses = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode > 299 || res.statusCode < 200)
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
    });
    next();
};
const middlewareMetricsInc = (req, res, next) => {
    config.fileserverHits += 1;
    next();
};
const handleRequests = (req, res) => {
    const hits = `Hits: ${config.fileserverHits}`;
    console.log(hits);
    res.send(`current hits to our app is ${hits}`);
};
const handleResetConfig = (req, res) => {
    config.fileserverHits = 0;
    res.status(200).send("Config is reset to 0 now");
};
const handlerReadiness = (req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8").status(200).send("OK");
};
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/api/metrics", handleRequests);
app.get("/api/reset", handleResetConfig);
app.listen(PORT, () => {
    console.log(`App is listening on the port: ${PORT}`);
});
