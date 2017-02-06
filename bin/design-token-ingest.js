#! /usr/bin/env node

const path = require('path');
const process = require('process');
const shell = require('shelljs');

const babelCli = path.resolve(__dirname, "..", "node_modules", ".bin", "babel-node");

const args = process.argv;
args.shift();
args.shift();
console.log(args.join(' '));
shell.exec(babelCli + " index.js " + args.join(' '));
