// lib/queue.js
import { Queue } from "bullmq";
import { Redis } from "ioredis";

// Configure Redis connection
const redis = new Redis({
  host: "localhost", // Adjust as necessary
  port: 6379, // Default Redis port
});

const logProcessingQueue = new Queue("log-processing-queue", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3, // Retry limit
    priority: 1, // Default priority
  },
});

export { logProcessingQueue };
