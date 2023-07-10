import { Router } from "express";
import {
  createUserDefinedReference,
  getAllReferences,
  getReferencesByType,
} from "../controllers/references";
import { checkReferenceType } from "../middleware/referenceTypeCheck";

const r: Router = Router();

r.get("/", getAllReferences);
r.get("/:type", checkReferenceType, getReferencesByType);
r.post("/:type", checkReferenceType, createUserDefinedReference);

export default r;
