import { NextFunction, Request, Response } from "express";
import { acceptedTypes } from "../data/referenceTypes";
import { ReferenceTypeError } from "../errors/ReferenceTypeError";
import { BadRequestError } from "../errors/BadRequestError";

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

/**
 * Checks that the body contains the required information when
 * creating a specific type of reference model
 */
export const checkPayloadOnReferenceCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.params;
    const body = req.body;
    const errors = [];

    if (!body.title)
      throw new BadRequestError("Missing title", [
        { field: "title", message: "Title is mandatory" },
      ]);

    if (type === "roles") {
      const mandatoryFields = [
        "roleDefinitions",
        "responsibilitiesAndObligations",
        "descriptions",
      ];

      mandatoryFields.forEach((f) => {
        if (!body[f])
          errors.push({
            field: f,
            message: "This field is mandatory when creating a role",
          });
      });
    } else {
      if (!body.definitions)
        errors.push({
          field: "definitions",
          message: "Missing mandatory definitions",
        });
    }

    if (errors.length)
      throw new BadRequestError("Missing mandatory fields", errors);

    next();
  } catch (err) {
    next(err);
  }
};
