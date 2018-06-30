#! /usr/bin/env node
'use strict';

const { join } = require('path');
const { version } = require('../package');
const program = require('commander');

try {
    program.version(version);

    for (let command of ['create']) {
        const Command = require(join('..', 'lib', command));
        new Command(program);
    }

    program.parse(process.argv);
} catch (error) {
    console.error(error);
}
