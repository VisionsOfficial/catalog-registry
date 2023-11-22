import { config } from "dotenv";
config();

import { startServer } from "./server";
// @ts-ignore
import job from "../cronjob/dbUpdateJob";

startServer();

job();
