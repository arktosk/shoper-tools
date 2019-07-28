#!/usr/bin/env node

import './config/env';
export * from "./scripts";

process.on(
  "unhandledRejection",
  (error: Error): void => {
    throw error;
  }
);
