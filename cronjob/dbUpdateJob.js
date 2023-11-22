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
  let mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

  // Append username and password if available
  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  }

  // Connect to the MongoDB database
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log(`dbUpdateJob Connected to MongoDB`);

      const schema = new mongoose.Schema({
        job: { type: String, required: true },
        scheduled: { type: Boolean, required: true },
        frequency: { type: String, required: true },
      });

      const dbUpdateJobConfiguration = await jobConfiguration
        .findOne({
          job: "dbUpdateJob",
        })
        .exec();

      if (dbUpdateJobConfiguration && dbUpdateJobConfiguration.scheduled) {
        switch (dbUpdateJobConfiguration.frequency) {
          case FrequencyEnum.DAILY:
            break;
        }
      }

      // Schedule a task to run every minute
      //   cron.schedule(
      //     "* * * * *",
      //     () => {
      //       // eslint-disable-next-line no-console,no-undef
      //       exec("node ./scripts/dbUpdate.js", (error, stdout, stderr) => {
      //         if (error) {
      //           console.log(`error: ${error.message}`);
      //           return;
      //         }
      //         if (stderr) {
      //           console.log(`stderr: ${stderr}`);
      //           return;
      //         }
      //         console.log(`stdout: ${stdout}`);
      //       });
      //     },
      //     {
      //       scheduled: true,
      //       // eslint-disable-next-line no-undef
      //       timezone: process.env.JOB_TIMEZONE,
      //     }
      //   );
    });
};

export default job;
