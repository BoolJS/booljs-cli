'use strict';

const fs = require('fs');
const Handpipe = require('handpipe');
const { join } = require('path');
const utils = require('util');
const resolve = require('resolve-global');

module.exports = function (namespace, options = {}) {
    let boilerplateDir = join(resolve('booljs-cli'), '..', '..', 'boilerplate');

    let origin = join(boilerplateDir, 'index.js');
    let destination = join(process.cwd(), '.', 'index.js');

    let {
        serverDrivers = ['booljs.express'],
        databaseDrivers = ['booljs.mongoose']
    } = options;

    if (serverDrivers.length === 0) {
        serverDrivers = ['booljs.express'];
    }

    if (databaseDrivers.length === 0) {
        databaseDrivers = ['booljs.mongoose'];
    }

    let dependenciesList = [ ...serverDrivers, ...databaseDrivers ]
        .filter(driver => driver !== undefined);

    var dependencies = dependenciesList
        .map(dependency => `\'${dependency}\'`)
        .join(', ');

    serverDrivers = serverDrivers
        .map(dependency => `\'${dependency}\'`)
        .join(', ');

    databaseDrivers = databaseDrivers
        .map(dependency => `\'${dependency}\'`)
        .join(', ');

    fs.createReadStream(origin)
        .pipe(Handpipe({
            dependencies,
            namespace,
            options: { serverDrivers, databaseDrivers }
        }))
        .pipe(fs.createWriteStream(destination, { flags: 'w' }));
};
