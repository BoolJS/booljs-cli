#! /usr/bin/env node
'use strict';

require('booljs-globals');

const path      = require('path');
const program   = require('commander');

program.version(process.env.BOOLJS_VERSION || '0.0.1');

for(let command of [
    'create'
]) {
    let Command = require(path.join('../lib', command));
    new Command(program);
}

program.parse(process.argv);
