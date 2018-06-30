'use strict';

const { load, init, install } = require('./npm-helpers');

module.exports = async function (options = {}) {
    let npm = await load({
        'engine-strict': true,
        loglevel: 'silent'
    });

    await init(npm);

    let { serverDrivers = [], databaseDrivers = [] } = options;
    let packages = [ 'booljs', ...serverDrivers, ...databaseDrivers ];

    if (packages.length > 0) {
        await install(npm, packages.filter(pkg => pkg !== undefined));
    }
};
