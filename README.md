## Symptom Triage API (Node + Express + TypeScript + Gemini)

Educational backend that accepts symptom text, queries Gemini for structured suggestions, and returns probable conditions with recommended next steps. Not a medical device; for education only.

### Requirements
- **Node**: 18.17+
- **API key**: Google Gemini (`GOOGLE_API_KEY`)

### Setup
1. **Copy env**: `.env.example` -> `.env`, set `GOOGLE_API_KEY`.
2. **Install**: `npm install`
3. **Dev**: `npm run dev`
4. **Build + start**: `npm run build && npm start`

### Environment variables
- **PORT**: HTTP port (default `3000`)
- **GOOGLE_API_KEY**: Gemini API key (required)
- **GEMINI_MODEL**: e.g., `gemini-2.5-flash` (default)
- **LOG_LEVEL**: log level (default `info`)

### Endpoint
- **POST** `/api/triage`

Request:
```json
{ "symptoms": "3-5 lines describing the symptoms" }
```

Response:
```json
{
  "disclaimer": "string",
  "conditions": [
    { "name": "string", "likelihood": "low|medium|high", "rationale": "string", "redFlags": ["string"] }
  ],
  "nextSteps": { "selfCare": ["string"], "monitor": ["string"], "seekCare": ["string"] },
  "urgentAction": false
}
```

### Quick test
```bash
curl -X POST http://localhost:3000/api/triage \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"Fever 38.5C, sore throat, fatigue for 3 days"}'
```

### Notes
- Uses `@google/generative-ai` with JSON schema and `responseMimeType: application/json`.
- For educational purposes only; not medical advice.


