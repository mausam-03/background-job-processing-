import { Worker } from "bullmq";
import dotenv from "dotenv";
import { connection } from "../queue/redisConnection.js";

dotenv.config();

const worker = new Worker(
  "jobQueue",
  async (job) => {
    console.log("Processing job:", job.name);

    // Example logic
    if (job.name === "email") {
      console.log("Sending email to:", job.data.email);
    }

    if (job.name === "certificate") {
      console.log("Generating certificate for:", job.data.userId);
    }

    return { success: true };
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed:`, err.message);
});