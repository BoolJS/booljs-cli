'use strict';

module.exports = function (options) {
    const Npm = require('npm');
    let load = q.nbind(Npm.load, Npm)
    ,   init, install;

    return load().then(npm => {
        init    = q.nbind(npm.commands.init,    npm.commands);
        install = q.nbind(npm.commands.install, npm.commands);
    }).then(() => init()).then(() => {
        var drivers = [ 'bool.js' ];
        if(options.server_driver) drivers.push(options.server_driver);
        if(options.database_driver) drivers.push(options.database_driver);
        if(drivers.length > 0){
            return install(drivers);
        }
    });
};
