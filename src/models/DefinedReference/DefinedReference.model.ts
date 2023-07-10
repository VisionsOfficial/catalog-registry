import { Schema, model } from "mongoose";

const definedReferenceSchema = new Schema(
  {
    /**
     * Type of the reference
     * ex: business-model | perimeter | value-sharing...
     */
    type: { type: String, required: true },

    /**
     * The reference url from the Prometheus-X Reference Models repository
     */
    refURL: { type: String, required: false },

    /**
     * Title of the reference model
     */
    title: { type: String, unique: true, required: true },

    /**
     * Stringified JSON-LD of the reference model
     */
    jsonld: { type: String, required: true },
  },
  { timestamps: true }
);

export const DefinedReference = model(
  "DefinedReference",
  definedReferenceSchema
);
