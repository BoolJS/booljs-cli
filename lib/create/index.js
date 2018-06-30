'use strict';

const { Types, CLICommand } = require('../utils/command');
const TempFolder = require('./temp-folder');
const Mkdir = require('./mkdir');
const Npm = require('./npm');
const Boilerplate = require('./boilerplate');
const Configure = require('./configure');

module.exports = class CreateCommand extends CLICommand {
    constructor(context) {
        super(context, 'init <namespace> [dir]', 'Creates a new project', {
            '-d, --database-drivers <drivers>': {
                description: 'Which database driver to use',
                type: Types.Collect
            },
            '-s, --server-drivers <drivers>': {
                description: 'Which server driver to use',
                type: Types.Collect
            }
        });
    }

    async action(command, namespace, dir, options) {
        if (options === undefined) {
            options = dir;
            dir = undefined;
        }

        try {
            let [ tmpDir, tmpDirCleanup ] = await TempFolder();
            await Mkdir(dir);
            await Npm(options);
            await Boilerplate();
            await Configure(namespace, options);
            await tmpDirCleanup();
        } catch(error) {
            console.error(error);
        }
    }
};
