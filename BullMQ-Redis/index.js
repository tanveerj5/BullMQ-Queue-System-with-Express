import Bull from "bull";
import dotenv from "dotenv";

dotenv.config();
const redisOptions = {
  redis: { host: "127.0.0.1", port: 6379, password: 123456 },
};

// DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions);

// REGISTER PROCESSOR
burgerQueue.process((payload, done) => {
  console.log("Preparing the burger!");

  setTimeout(() => {
    console.log("Burger Ready!");
    done();
  }, 4000);
});

// ADD JOB TO THE QUEUE
burgerQueue.add({
  bun: "good",
  cheese: "yummy",
  topping: ["good", "better", "best"],
});
