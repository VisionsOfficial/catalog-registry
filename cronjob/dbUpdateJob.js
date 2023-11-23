// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
import { exec } from "child_process";
import { jobConfiguration } from "../src/models/JobConfiguration/JobConfiguration.model";
import { FrequencyEnum } from "../src/utils/enums/frequencyEnum";

const { config } = require("dotenv");
config();
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const cron = require("node-cron");
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const mongoose = require("mongoose");

const job = () => {
  // Construct the MongoDB URI
  // eslint-disable-next-line no-undef
  let mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

  // Append username and password if available
  // eslint-disable-next-line no-undef
  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    // eslint-disable-next-line no-undef
    mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;
  }

  // Connect to the MongoDB database
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      // eslint-disable-next-line no-console,no-undef
      console.log(`dbUpdateJob Connected to MongoDB`);

      const dbUpdateJobConfiguration = await jobConfiguration
        .findOne({
          job: "dbUpdateJob",
        })
        .exec();

      // By default, every day at 4AM
      let cronSchedule = "0 4 * * *";

      if (dbUpdateJobConfiguration && dbUpdateJobConfiguration.scheduled) {
        switch (dbUpdateJobConfiguration.frequency) {
          case FrequencyEnum.DAILY:
            cronSchedule = "0 4 * * *";
            break;
          // Every sunday at 4AM
          case FrequencyEnum.WEEKLY:
            cronSchedule = "0 4 * * SUN";
            break;
          // Every 1 of the month at 4 AM
          case FrequencyEnum.MONTHLY:
            cronSchedule = "0 4 1 * *";
            break;
          // every first of january
          case FrequencyEnum.ANNUALLY:
            cronSchedule = "0 4 1 1 *";
            break;
        }
      }

      cron.schedule(
        cronSchedule,
        () => {
          exec("node ./scripts/dbUpdate.js", (error, stdout, stderr) => {
            if (error) {
              // eslint-disable-next-line no-console,no-undef
              console.log(`error: ${error.message}`);
              return;
            }
            // eslint-disable-next-line no-console,no-undef
            console.log(`Job Launched successfully`);
          });
        },
        {
          scheduled: dbUpdateJobConfiguration?.scheduled ?? true,
          // eslint-disable-next-line no-undef
          timezone: process.env.JOB_TIMEZONE,
        }
      );
    });
};

export default job;
