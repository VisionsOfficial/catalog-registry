import express, { Application } from "express";
import cors from "cors";
import { loadRoutes } from "./routes";
import { loadMongoose } from "./config/database";
import path from "path";
import * as process from "process";

export const startServer = (testPort?: number) => {
  loadMongoose();

  const app: Application = express();
  const port = testPort || process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  loadRoutes(app);

  if(process.env.NODE_ENV !== "development"){
    app.use(
      "/static/references",
      express.static(path.join(__dirname, "..", "..", "static"))
    );
  } else {
    app.use(
      "/static/references",
      express.static(path.join(__dirname, "..", "static"))
    );
  }

  // Start the server
  const server = app.listen(port, () => {
    //eslint-disable-next-line
    console.log(`Catalog-Registry running on: http://localhost:${port}`);
  });

  return { server, app }; // For tests
};
