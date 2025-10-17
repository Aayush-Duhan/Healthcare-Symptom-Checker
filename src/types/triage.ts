import { z } from "zod";

export const likelihoodValues = ["low", "medium", "high"] as const;
export type Likelihood = (typeof likelihoodValues)[number];

export const conditionSchema = z.object({
  name: z.string().min(1),
  likelihood: z.enum(likelihoodValues),
  rationale: z.string().min(1),
  redFlags: z.array(z.string()).default([]),
});
export type Condition = z.infer<typeof conditionSchema>;

export const nextStepsSchema = z.object({
  selfCare: z.array(z.string()).default([]),
  monitor: z.array(z.string()).default([]),
  seekCare: z.array(z.string()).default([]),
});
export type NextSteps = z.infer<typeof nextStepsSchema>;

export const triageResponseSchemaZ = z.object({
  disclaimer: z.string().min(1),
  conditions: z.array(conditionSchema).min(1),
  nextSteps: nextStepsSchema,
  urgentAction: z.boolean(),
});
export type TriageResponse = z.infer<typeof triageResponseSchemaZ>;

export const triageRequestSchema = z.object({
  symptoms: z.string().min(5).max(2000),
});
export type TriageRequest = z.infer<typeof triageRequestSchema>;


