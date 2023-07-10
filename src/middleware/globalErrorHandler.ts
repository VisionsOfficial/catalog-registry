import { Request, Response, NextFunction } from "express";
import { ReferenceTypeError } from "../errors/ReferenceTypeError";
import { BadRequestError } from "../errors/BadRequestError";
import { acceptedTypes } from "../data/referenceTypes";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ReferenceTypeError) {
    return res.status(400).json({
      error: "Unknown Reference Type",
      message: err.message,
      details: `Please provide a known reference type from the following list: ${acceptedTypes.join(
        " | "
      )}`,
    });
  } else if (err instanceof BadRequestError) {
    return res.status(400).json(err.jsonResponse());
  } else {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong",
    });
  }

  next(err);
};
