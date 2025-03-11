import { NextApiRequest, NextApiResponse } from "next";
import { Queue, Worker, QueueScheduler } from "bullmq";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const queue = new Queue("logProcessing");
new QueueScheduler("logProcessing");

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: { bodyParser: false },
};

// POST /api/upload-logs
export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("file")(req, res, async (err) => {
      if (err) return res.status(500).json({ error: "File upload error" });

      const { buffer, originalname } = req.file;
      const { data, error } = await supabase.storage
        .from("logs")
        .upload(`uploads/${Date.now()}_${originalname}`, buffer);

      if (error) return res.status(500).json({ error: "File upload failed" });

      const job = await queue.add("processLogs", { filePath: data.path });
      res.status(200).json({ jobId: job.id });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// GET /api/stats
export async function getStats(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  const { data, error } = await supabase.from("stats").select("*");
  if (error) return res.status(500).json({ error: "Failed to fetch stats" });
  res.status(200).json(data);
}

// GET /api/stats/[jobId]
export async function getJobStats(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  const { jobId } = req.query;
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .eq("jobId", jobId);
  if (error)
    return res.status(500).json({ error: "Failed to fetch job stats" });
  res.status(200).json(data);
}

// GET /api/queue-status
export async function getQueueStatus(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  const counts = await queue.getJobCounts();
  res.status(200).json(counts);
}

// Worker processing logs
new Worker("logProcessing", async (job) => {
  console.log("Processing job:", job.id);
  // Process log file (dummy implementation)
  await supabase.from("stats").insert({ jobId: job.id, processed: true });
});
