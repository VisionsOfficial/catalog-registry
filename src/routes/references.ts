import { Router } from "express";
import {
  createUserDefinedReference,
  getAllReferences,
  getReferencesByType,
} from "../controllers/references";
import {
  checkPayloadOnReferenceCreation,
  checkReferenceType,
} from "../middleware/referenceTypeCheck";

const r: Router = Router();

r.get("/", getAllReferences);
r.get("/:type", checkReferenceType, getReferencesByType);
r.post(
  "/:type",
  checkReferenceType,
  checkPayloadOnReferenceCreation,
  createUserDefinedReference
);

export default r;
