import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};
