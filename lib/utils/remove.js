'use strict';

const { unlink: unlinkAsync } = require('fs');
const Promisify = require('es-promisify');
const unlink = Promisify(unlinkAsync);

module.exports = path => unlink(path);
