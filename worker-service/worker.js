import { Worker } from "bullmq";
import dotenv from "dotenv";
import { connection } from "../queue/redisConnection.js";

dotenv.config();

const worker = new Worker(
  "jobQueue",
  async (job) => {
    console.log("Processing job:", job.name);

    //  simulate random failure
    const fail = Math.random() < 0.5;

    if (fail) {
      console.log("Simulated failure");
      throw new Error("Random failure occurred");
    }

    console.log("Job succeeded:", job.id);

    return { success: true };
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(
    `Job ${job.id} failed. Attempt ${job.attemptsMade}/${job.opts.attempts}`
  );
});