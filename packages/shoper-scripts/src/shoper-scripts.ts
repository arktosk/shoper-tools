#!/usr/bin/env node

import './config/env';

import {paths} from './config';
// console.log(process.env.WEBDAV_HOSTNAME);

process.on(
  "unhandledRejection",
  (error: Error): void => {
    throw error;
  }
);
