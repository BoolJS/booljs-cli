'use strict';

module.exports = function () {
    const copy  = require('../utils/copy');
    const path  = require('path');

    let location    = path.resolve(
        require.resolve('..'), '..', '..', 'boilerplate'
    )
    ,   destination = path.join(process.cwd(), '.');

    return copy(location, destination);
};
