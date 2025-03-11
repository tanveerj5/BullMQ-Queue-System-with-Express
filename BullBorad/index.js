const express = require("express");
const dotenv = require("dotenv");
const Queue = require("bull");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");

(async () => {
  dotenv.config();

  // Define the Redis connection options
  const redisOptions = {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD, // if no password, omit this field
    },
  };

  // Create a new queue with the Redis connection options
  const queuesList = ["burger"];

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/admin/queues");

  const queues = queuesList
    .map((qs) => new Queue(qs, redisOptions))
    .map((q) => new BullAdapter(q));
  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues,
    serverAdapter: serverAdapter,
  });

  const app = express();

  app.use("/admin/queues", serverAdapter.getRouter());

  // other configurations of your server

  const { PORT = 8000 } = process.env;
  app.listen(PORT, () => {
    console.info(`Running on ${PORT}...`);
    console.info(`For the UI, open http://localhost:${PORT}/admin/queues`);
    console.info("Make sure Redis is running on port 6379 by default");
  });
})();
