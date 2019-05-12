#!/usr/bin/env node

console.log('Shoper Scripts');

console.log(process.argv.slice(2));

const enum Scripts {
    start = 'start',
    build = 'build',
    test = 'test',
}

console.log(Scripts.start);

process.on('unhandledRejection', (error) => { throw error; });
