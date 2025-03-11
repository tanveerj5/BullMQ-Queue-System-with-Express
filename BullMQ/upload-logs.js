// pages/api/upload-logs.js
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { logProcessingQueue } from "../../lib/queue";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadLogs = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./uploads";
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error processing file upload." });
    }

    const file = files.file[0];
    const filePath = path.join(form.uploadDir, file.newFilename);
    const fileId = file.newFilename;

    // Add the job to the queue
    const job = await logProcessingQueue.add("process-log", {
      fileId,
      filePath,
    });

    return res.status(200).json({ jobId: job.id });
  });
};

export default uploadLogs;
