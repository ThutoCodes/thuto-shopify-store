import { createRequestHandler } from "@remix-run/express";
import express from "express";

const app = express();

// Serve static files from /public
app.use(express.static("public"));

// Handle all requests with Remix
app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    mode: process.env.NODE_ENV,
  })
);

// Start the server (only for local dev)
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
  });
}

export default app;