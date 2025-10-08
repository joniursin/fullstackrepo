import { Gender, HealthCheckRating } from "./types";
import { z } from "zod";

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.date(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.date,
      endDate: z.date(),
    })
    .optional(),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.enum(Gender),
  occupation: z.string(),
  ssn: z.string(),
  entries: z.array(EntrySchema).default([]),
});
