/**
 * Wrapper around the C library in this package
 */
// TODO: codegen from adder.h to avoid manually keeping them in sync
interface adder {
    add: (first: number, second: number) => number;
}

// Load the native addon directly from the Bazel runfiles
export const adder = require('bindings')('adder');
