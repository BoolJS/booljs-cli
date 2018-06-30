'use strict';

const Npm = require('global-npm');

exports.load = config => new Promise((resolve, reject) => Npm
    .load(config, (error, npm) => {
        if (error !== undefined && error !== null) {
            return reject(error);
        }

        resolve(npm);
    })
);

exports.init = npm => new Promise((resolve, reject) => npm.commands
    .init((error, data) => {
        if (error !== undefined && error !== null) {
            return rejct(error);
        }

        resolve(data);
    })
);

exports.install = (npm, packages) => new Promise((resolve, reject) => npm
    .commands.install(packages, (error, data) => {
        if (error !== undefined && error !== null) {
            return rejct(error);
        }

        resolve(data);
    })
);
