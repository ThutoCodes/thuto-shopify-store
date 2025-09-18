import { createRequestHandler } from "@shopify/remix-oxygen";

// Export the serverless handler for Vercel
export default createRequestHandler({
  build: require("./build"),
  mode: process.env.NODE_ENV,
});