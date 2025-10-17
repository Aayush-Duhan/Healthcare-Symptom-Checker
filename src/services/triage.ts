import { getGeminiModel, jsonGenerationConfig } from "./geminiClient.js";
import { triageResponseSchemaZ, type TriageResponse } from "../types/triage.js";

export async function triageSymptoms(symptoms: string): Promise<TriageResponse> {
  const model = getGeminiModel();

  const contents = [
    {
      role: "user",
      parts: [
        { text: `Symptoms:\n${symptoms}` },
        { text: "Return JSON only." },
      ],
    },
  ];

  const result = await model.generateContent({
    contents,
    generationConfig: jsonGenerationConfig,
  });

  const text = result.response.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Model returned non-JSON response");
  }

  const output = triageResponseSchemaZ.safeParse(parsed);
  if (!output.success) {
    throw new Error("Model returned invalid JSON shape");
  }

  return output.data;
}


