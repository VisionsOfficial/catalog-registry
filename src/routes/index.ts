import { Application, Request, Response } from "express";

// Routes
import references from "./references";
import { globalErrorHandler } from "../middleware/globalErrorHandler";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../../docs/swagger.json";

const API_PREFIX = "/v1";

export const loadRoutes = (app: Application) => {
  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "OK" });
  });
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use(`${API_PREFIX}/references`, references);
  app.use(globalErrorHandler);
};
