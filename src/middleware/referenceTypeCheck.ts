import { NextFunction, Request, Response } from "express";
import { acceptedTypes } from "../data/referenceTypes";
import { ReferenceTypeError } from "../errors/ReferenceTypeError";

/**
 * Verifies that the type param is a known one
 */
export const checkReferenceType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.params;
    if (!acceptedTypes.includes(type)) {
      throw new ReferenceTypeError("Provided reference type is unknown");
    }
    next();
  } catch (err) {
    next(err);
  }
};
