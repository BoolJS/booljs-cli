'use strict';

const { ncp: asyncNcp } = require('ncp');
const Promisify = require('es-promisify');
const ncp = Promisify(asyncNcp);

module.exports = (source, destination) => ncp(source, destination);
