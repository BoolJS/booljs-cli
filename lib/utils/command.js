'use strict';

module.exports = class CLICommand {
    constructor(context, command, description, options) {
        (context
            .command(command)
        ).description(description);

        for(let key in options){
            context.option(key, options[key]);
        }

        context.action(this.action);
    }
};
