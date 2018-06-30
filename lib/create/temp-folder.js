'use strict';

const Promisify = require('es-promisify');
const tmp = require('tmp');
const dir = Promisify(tmp.dir);

module.exports = () => dir()
