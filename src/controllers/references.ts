import { NextFunction, Request, Response } from "express";
import { DefinedReference } from "../models/DefinedReference/DefinedReference.model";
import { BadRequestError } from "../errors/BadRequestError";
import { mapLanguageValueArray } from "../utils/parseLanguageValue";

/**
 * Retrieves all reference models
 */
export const getAllReferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await DefinedReference.find();
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves all references of a specific type
 */
export const getReferencesByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.params;
    const data = await DefinedReference.find({ type });
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

type LanguageContainerField = { "@language": string; "@value": string }[];
type ReferenceCreationPayload = {
  /**
   * Title / Name of the reference
   */
  title?: string;

  /**
   * Descriptions (multiple language support)
   * Used only for roles
   */
  descriptions?: LanguageContainerField;

  /**
   * Reference Definition (multiple language support)
   * Used on all but roles
   */
  definitions?: LanguageContainerField;

  /**
   * Definitions for a role
   * Used only for roles
   */
  roleDefinitions?: string[];

  /**
   * Responsibilities and obligations of a role
   * Used only for roles
   */
  responsibilitiesAndObligations?: string[];
};

/**
 * Creates a user defined reference model and creates the matching
 * JSON-LD model for it to match PTX reference models
 */
export const createUserDefinedReference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.params;
    const {
      title,
      descriptions,
      definitions,
      roleDefinitions,
      responsibilitiesAndObligations,
    }: ReferenceCreationPayload = req.body;

    if (!title)
      throw new BadRequestError("Missing mandatory parameters from payload", [
        { field: "title", message: "Missing parameter title" },
      ]);

    const newRef = new DefinedReference({
      type,
      title,
      refURL: null,
    });

    let jsonldData;

    // Create JSON-LD for the new reference
    if (type === "roles") {
      jsonldData = {
        "@context": {
          description: {
            "@id": "https://schema.org/description",
            "@container": "@language",
          },
        },
        title: title,
        description: mapLanguageValueArray(descriptions) || [],
        definitions: roleDefinitions || [],
        responsibilitiesAndObligations: responsibilitiesAndObligations || [],
      };
    } else {
      jsonldData = {
        "@context": {
          definition: {
            "@id": "https://schema.org/DefinedTerm",
            "@container": "@language",
          },
        },
        title,
        definition: mapLanguageValueArray(definitions) || [],
      };
    }
    newRef.jsonld = JSON.stringify(jsonldData);

    await newRef.save();
    return res.json(newRef);
  } catch (err) {
    next(err);
  }
};
