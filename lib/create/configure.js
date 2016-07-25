'use strict';

module.exports = function (namespace, options) {
    const fs    = require('fs');
    const hb    = require('handpipe');
    const path  = require('path');
    const utils = require('util');

    let origin  = path.join(
        require.resolve('..'), '..', '..', 'boilerplate', 'index.js'
    )
    ,   destination = path.resolve(process.cwd(), '.', 'index.js')
    ,   dependencies = _.filter([
        options.server_driver,
        options.database_driver
    ], driver => driver !== undefined);

    var dependenciesTemplate = (dependencies.length > 0 ?
        utils.format(', %j', dependencies) : ''
    );

    options.server_driver = options.server_driver || 'booljs-express';
    options.database_driver = options.database_driver || 'booljs-nomodel';

    var compiler = hb({
        dependencies: dependenciesTemplate,
        namespace: namespace,
        options: options
    });

    (fs.createReadStream(origin)
        .pipe(compiler)
    ).pipe(fs.createWriteStream(destination, {
        flags: 'w'
    }));

    return q.resolve();
};
