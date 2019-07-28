#!/usr/bin/env node
export * from "./scripts";

process.on(
  "unhandledRejection",
  (error: Error): void => {
    throw error;
  }
);
