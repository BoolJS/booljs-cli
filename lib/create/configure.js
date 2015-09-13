'use strict';

module.exports = function (namespace, options) {
    var fs      = require('fs')
    ,   hb      = require('handpipe')
    ,   path    = require('path')
    ,   index   = path.join(
        require.resolve('../..'), '../boilerplate/index.js'
    );

    options.server_driver = options.server_driver || 'booljs-express';
    options.database_driver = options.database_driver || 'booljs-nomodel';

    var compiler = hb({
        namespace: namespace,
        options: options
    });

    var input = fs.createReadStream(index)
    ,   output = fs.createWriteStream('index.js', {
        flags: 'w'
    });

    input.pipe(compiler).pipe(output);
    return q.resolve();
};
