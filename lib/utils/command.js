'use strict';

exports.Types = {
    String: value => value.toString(),
    Array: (value, memo = []) => memo.concat(value.split(/,\s*/)),
    Range: value => value.split('...').map(Number),
    Collect: (value, memo = []) => {
        memo.push(value)
        return memo;
    },
    Increase: (value, total) => total + value,
    IncreaseVerbosity: (value, total) => exports.Types.Increase(1, total)
};

Object.prototype.forEach = function (fn) {
    Object.keys(this).forEach(key => fn(this[key], key, this));
}

exports.CLICommand = class {
    constructor(context, command, description, options) {
        context
            .command(command)
            .description(description);

        options.forEach((option = {}, key) => {
            let Types = exports.Types;
            let {
                description = '',
                type = exports.Types.String,
                default: _default
            } = option;

            if (type === Types.Collect || type === Types.Array) {
                context.option(key, description, type, _default || []);
            } else {
                context.option(key, description, type, _default);
            }

        });

        context.action(this.action);
    }
};
