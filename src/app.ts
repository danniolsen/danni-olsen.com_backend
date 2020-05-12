import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import GraphEndpoint from "./graph/GraphEndpoint";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("*", function(
  _req: express.Request,
  res: express.Response,
  next: Function
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.options("*", cors());

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send("ok");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASS
    }@events-g56m9.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    GraphEndpoint(app);
    app.listen(5000, () => console.log("Server running"));
  })
  .catch((err: object) => {
    console.log("Could not connect to server", err);
  });
