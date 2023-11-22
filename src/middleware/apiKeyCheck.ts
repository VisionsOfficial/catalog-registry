import { NextFunction, Request, Response } from "express";
import { ReferenceTypeError } from "../errors/ReferenceTypeError";
import { BadRequestError } from "../errors/BadRequestError";
import { jobs } from "../data/jobs";
import { FrequencyEnum } from "../utils/enums/frequencyEnum";

/**
 * Verifies that the API KEY is in the header of the request
 */
export const apiKeyCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.headers["x-api-key"] ||
      req.headers["x-api-key"] !== process.env.API_KEY
    ) {
      throw new BadRequestError("Header Error", [
        { field: "x-api-key", message: "Wrong or missing api key" },
      ]);
    }
    next();
  } catch (err) {
    next(err);
  }
};
