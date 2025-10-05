import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { newPatientSchema } from "../utils";
import { z } from "zod";
import { NewPatient, Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.use(errorMiddleware);

export default router;
