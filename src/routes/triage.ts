import { Router } from "express";
import { triageRequestSchema } from "../types/triage.js";
import { triageSymptoms } from "../services/triage.js";

const router = Router();

router.post("/triage", async (req, res, next) => {
  const parsed = triageRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.issues.map(i => i.message) });
  }

  try {
    const data = await triageSymptoms(parsed.data.symptoms);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;


