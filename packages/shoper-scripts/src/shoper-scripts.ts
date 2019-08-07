#!/usr/bin/env node

import * as spawn from 'cross-spawn';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

/** Register available scripts */
export const shoperScripts: string[] = [
  'start',
];

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", (error: Error): void => {
    throw error;
  }
);

const processArguments: string[] = process.argv.slice(2);

const scriptsPath: string = path.resolve(__dirname, './scripts');
const scriptIndex: number = processArguments.findIndex((argument: string): boolean => shoperScripts.indexOf(argument) !== -1);
console.log(scriptIndex);
console.log(scriptsPath);
// process.chdir('/tmp');
// console.log(process.cwd());

if (scriptIndex === -1) {
  throw new Error(
    `Unknown script: "${processArguments[0]}"`
  );
}

const result: cp.SpawnSyncReturns<Buffer> = spawn.sync(
  'node',
  processArguments.slice(0, scriptIndex)
    .concat(require.resolve('./scripts/' + processArguments[scriptIndex]))
    .concat(processArguments.slice(scriptIndex + 1)),
  { stdio: 'inherit' }
);

fs.readdirSync(scriptsPath).filter((file) => file.match(/\.js$/)).forEach((file: string) => {
  console.log(path.basename(file, '.js'));
});
