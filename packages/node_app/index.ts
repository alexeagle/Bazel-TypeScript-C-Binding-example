import type adder from "adder_lib";
const addon: typeof adder = require('bindings')('adder');

function do_add(a: number, b: number): number {
    return addon.add(a, b);
}

// Example usage
console.log(`5 + 3 = ${do_add(5, 3)}`);
