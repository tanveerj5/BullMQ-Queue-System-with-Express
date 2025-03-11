# BullMQ Queue System with Express

This repository demonstrates how to set up and manage job queues using [Bull](https://github.com/OptimalBits/bull) and [BullMQ](https://github.com/taskforcesh/bullmq) with Redis in a Node.js application. It also integrates [@bull-board](https://github.com/felixmosh/bull-board) to provide a web UI for monitoring job queues.

## Features
- Job queue management with Bull and BullMQ
- Redis-based queue persistence
- Bull Board UI for monitoring jobs
- Express.js integration
- Can be integrated with a frontend service such as React, HTML, CSS, and JavaScript

## Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Redis](https://redis.io/) (running on default port `6379`)
- [Docker](https://www.docker.com/) (optional, for running Redis in a container)

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/bull-queue-system.git
   cd bull-queue-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up a `.env` file with the following values:
   ```ini
   PORT=8000
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_PASSWORD=123456  # Remove if Redis does not require a password
   ```

4. Run Redis (if not already running):
   ```sh
   redis-server
   ```
   OR using Docker:
   ```sh
   docker run -d --name redis -p 6379:6379 redis
   ```

## Running the Application

Start the Express server:
```sh
npm start
```

### Adding Jobs to the Queue
The `burgerQueue` processes jobs and simulates burger preparation:

```javascript
burgerQueue.add({
  bun: "good",
  cheese: "yummy",
  topping: ["good", "better", "best"],
});
```

### Monitoring Queues
Access the Bull Board UI at:
```
http://localhost:8000/admin/queues
```

## Project Structure
```
.
├── lib/
│   ├── queue.js  # BullMQ queue setup
├── server.js     # Express server with Bull Board UI
├── .env          # Environment variables
├── package.json  # Dependencies and scripts
└── README.md     # Project documentation
```

# Log Processing API

This project implements a simple API for uploading log files, processing them asynchronously using BullMQ, and storing the result in a Supabase database. The API exposes several endpoints for file upload, job status retrieval, and queue monitoring.

## Technologies Used
- **Next.js** for the backend API.
- **BullMQ** for queue management and job processing.
- **Supabase** for storage and database.
- **Multer** for handling file uploads.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/tanveerj5/BullMQ-Queue-System-with-Express
   cd https://github.com/tanveerj5/BullMQ-Queue-System-with-Express/tree/main/my-next-app

## Contributing
Feel free to submit issues or pull requests for improvements!


