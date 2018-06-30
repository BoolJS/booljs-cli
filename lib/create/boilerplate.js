'use strict';

const { join } = require('path');
const copy = require('../utils/copy');
const remove = require('../utils/remove');
const resolve = require('resolve-global');

module.exports = async function () {
    let location = join(resolve('@booljs/cli'), '..', '..', 'boilerplate');
    let destination = join(process.cwd(), '.');

    await copy(location, destination);
    await remove(join(destination, '.git'));
};
