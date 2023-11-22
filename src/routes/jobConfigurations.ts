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

const r: Router = Router();

r.get("/", getAllConfiguration);
r.get("/:job", checkJob, getJobConfigurationByName);
r.patch(
  "/:job",
  checkJob,
  checkPayloadOnJobConfigurationUpdate,
  updateJobConfiguration
);

export default r;
