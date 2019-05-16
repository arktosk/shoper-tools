#!/usr/bin/env node
import { startScript } from "./scripts/start";

const enum Scripts {
  START = "start",
  BUILD = "build",
  TEST = "test",
}

process.on(
  "unhandledRejection",
  (error): void => {
    throw error;
  }
);
