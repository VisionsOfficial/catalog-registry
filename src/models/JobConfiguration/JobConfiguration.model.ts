import { Schema, model } from "mongoose";

const jobConfigurationSchema = new Schema(
  {
    /**
     * the job name of the configuration
     * ex: dbUpdateJob
     */
    job: { type: String, required: true },

    /**
     * enable or disable the cron job
     * ex: true | false
     */
    scheduled: { type: Boolean, required: true },

    /**
     * The frequency of the cron
     */
    frequency: { type: String, required: true },
  },
  { timestamps: true }
);

export const jobConfiguration = model(
  "JobConfiguration",
  jobConfigurationSchema
);
