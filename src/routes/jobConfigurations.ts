import { Router } from "express";
import {
  getAllConfiguration,
  getJobConfigurationByName,
  updateJobConfiguration,
} from "../controllers/jobConfigurations";
import {
  checkJob,
  checkPayloadOnJobConfigurationUpdate,
} from "../middleware/jobConfigurationCheck";
import { apiKeyCheck } from "../middleware/apiKeyCheck";

const r: Router = Router();

r.get("/", apiKeyCheck, getAllConfiguration);
r.get("/:job", apiKeyCheck, checkJob, getJobConfigurationByName);
r.patch(
  "/:job",
  apiKeyCheck,
  checkJob,
  checkPayloadOnJobConfigurationUpdate,
  updateJobConfiguration
);

export default r;
