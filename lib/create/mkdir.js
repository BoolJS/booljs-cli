'use strict';

const { mkdir } = require('fs');
const Promisify = require('es-promisify');
const mkdirSync = Promisify(mkdir);

module.exports = async function (dir = '.') {
    try {
        await mkdirSync(dir);
        process.chdir(dir);
    } catch(error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
};
