import express, { NextFunction, Request, Response } from "express";
import { config } from "./config.js";

const app = express();

app.use(express.json()); //Build in json parsing middleware.....

const PORT = 8080;

class BadRequest extends Error {
  constructor(message: string) {
    super(message);
  }
}

class Unauthorized extends Error {
  constructor(message: string) {
    super(message);
  }
}

class Forbidden extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const middlewareLogResponses = (
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

const middlewareMetricsInc = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.fileserverHits += 1;
  next();
};

const handlerMetrics = (req: Request, res: Response) => {
  res
    .status(200)
    .set("Content-Type", "text/html; charset=utf-8")
    .send(
      `<html>
      <body>
        <h1>Welcome, Chirpy Admin</h1>
        <p>Chirpy has been visited ${config.fileserverHits} times!</p>
      </body>
    </html>`,
    );
};

const handleResetConfig = (req: Request, res: Response) => {
  config.fileserverHits = 0;
  res.status(200).send("Config is reset to 0 now");
};

const handlerReadiness = (req: Request, res: Response) => {
  res
    .header("Content-Type", "text/plain; charset=utf-8")
    .status(200)
    .send("OK");
};

const handlerAcceptJSONData = async (req: Request, res: Response) => {
  type parameter = {
    body: string;
  };

  const profaneWordList = ["kerfuffle", "sharbert", "fornax"];

  const paramBody: parameter = req.body;

  //try {
  if (!paramBody["body"]) throw new Error("Unable to parse the body");
  if (paramBody["body"].length > 140) throw new BadRequest("Chirp is too long. Max length is 140");

  for (const word of profaneWordList) {
    const regex = new RegExp(word, "gi");
    paramBody["body"] = paramBody["body"].replace(regex, "****");
  }
  res
    .status(200)
    .header("Content-Type", "application/json")
    .send({ cleanedBody: paramBody["body"] });
  //} catch (err: unknown) {
  //   if (err instanceof Error) {
  //     res
  //       .status(400)
  //       .header("Content-Type", "application/json")
  //       .send({
  //         error: `${err.message}`,
  //       });
  //   } else {
  //     res.status(400).header("Content-Type", "application/json").send({
  //       error: `Something horribly went wrong`,
  //     });
  //   }
  // }
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof BadRequest) {
    res.status(400).json({ error: err.message });
  } else if (err instanceof Unauthorized) {
    res.status(401).json({ error: err.message });
  } else if (err instanceof Forbidden) {
    res.status(403).json({ error: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Something went wrong on our end" });
  }
};

app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handleResetConfig);
app.post(
  "/api/validate_chirp",
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handlerAcceptJSONData(req, res)).catch(next);
  },
);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on the port: ${PORT}`);
});
