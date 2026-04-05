import express from "express";
import dotenv from "dotenv";
import { jobQueue } from "../queue/jobQueue.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/add-job", async (req, res) => {
  const { type, payload } = req.body;

  const job = await jobQueue.add(type, payload);

  res.json({
    message: "Job added",
    jobId: job.id,
  });
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});