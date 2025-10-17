import { GoogleGenerativeAI, SchemaType, type GenerationConfig } from "@google/generative-ai";
import { env } from "../config/env.js";

export const triageResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    disclaimer: { type: SchemaType.STRING },
    conditions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          likelihood: { type: SchemaType.STRING, enum: ["low", "medium", "high"] },
          rationale: { type: SchemaType.STRING },
          redFlags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        },
        required: ["name", "likelihood", "rationale", "redFlags"],
      },
    },
    nextSteps: {
      type: SchemaType.OBJECT,
      properties: {
        selfCare: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        monitor: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        seekCare: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      },
      required: ["selfCare", "monitor", "seekCare"],
    },
    urgentAction: { type: SchemaType.BOOLEAN },
  },
  required: ["disclaimer", "conditions", "nextSteps", "urgentAction"],
} as const;

export const systemInstruction = [
  "You are a careful medical education assistant.",
  "Based on the user-described symptoms, output ONLY valid JSON per the provided schema.",
  "Do not add prose.",
  "Requirements:",
  "- Provide 3–6 plausible conditions with brief rationale; mark red flags",
  "- Give clear next steps: selfCare, monitor, seekCare",
  "- Set urgentAction=true only if immediate medical attention is advisable",
  "- Always include an educational disclaimer; not a diagnosis; consult a clinician for concerns",
].join("\n");

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

export function getGeminiModel() {
  return genAI.getGenerativeModel({
    model: env.GEMINI_MODEL,
    systemInstruction,
  });
}

export const jsonGenerationConfig: GenerationConfig = {
  responseMimeType: "application/json",
  // The SDK typing for responseSchema is permissive; cast to satisfy TS.
  responseSchema: triageResponseSchema as any,
};


