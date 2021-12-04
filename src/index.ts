#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import { parse } from './parse';
import { exec } from 'child_process';

const program = new Command();
program
  .option('-c, --config <type>', 'custom path to cloudbuild config')
  .option('-o, --open', 'open the generated file');

program.parse(process.argv);

const options = program.opts();

let yamlPath = path.resolve('./', 'cloudbuild.yaml');

if (options.config) {
  yamlPath = path.resolve('./', options.config)
}

if (!fs.existsSync(yamlPath)) {
  throw new Error('file does not exist');
}

parse(yamlPath);

if (options.open) {
  exec('open index.html')
}