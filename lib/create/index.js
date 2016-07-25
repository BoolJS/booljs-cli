'use strict';

const CLICommand = require('../utils/command');

module.exports = class CreateCommand extends CLICommand {

    constructor(context) {
        super(context, 'create <namespace> [dir]', 'Creates a new project', {
            '-d, --database_driver <driver>': 'Which database driver to use',
            '-s, --server_driver <driver>': 'Which server driver to use'
        });
    }

    action(command, namespace, dir, options) {
        const mkdir         = require('./mkdir');
        const npm           = require('./npm');
        const boilerplate   = require('./boilerplate');
        const configure     = require('./configure');

        let mkdird = mkdir(dir);

        return (mkdird
            .then(() => npm(options))
            .then(() => boilerplate())
            .then(() => configure(namespace, options))
        ).catch(log.error);
    }
};
