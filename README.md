# Example of a Node.js TypeScript program calling C code

https://github.com/nodejs/node-gyp and https://github.com/cmake-js/cmake-js are both build systems for building a C or C++ library that can be consumed from Node.js.

Bazel can do this instead!

## The C library

The `adder_lib` folder contains a simple C library that adds two numbers.
It includes a Node.js binding (adder_binding.cpp) and a TypeScript declaration file (adder.d.ts).

It also has a main entry point which we can use to verify the library works:

```shell
% bazel run //adder_lib:main
...
INFO: Running command line: bazel-bin/adder/main
5 + 3 = 8
```

A second `cc_binary` target is added to build the binding library.
It compiles with static linking to produce a dynamic-linkable library (.so on linux, .dylib on macOS, .dll on Windows)

```shell
% alexeagle@aspect-build type_script_c_make.js_example % bazel build //adder_lib:adder_binding
INFO: Analyzed target //adder_lib:adder_binding (1 packages loaded, 5 targets configured).
INFO: Found 1 target...
Target //adder_lib:adder_binding up-to-date:
  bazel-bin/adder_lib/libadder_binding.dylib
INFO: Elapsed time: 0.151s, Critical Path: 0.00s
INFO: 1 process: 8 action cache hit, 1 internal.
INFO: Build completed successfully, 1 total action
alexeagle@aspect-build type_script_c_make.js_example % file bazel-bin/adder_lib/libadder_binding.dylib
bazel-bin/adder_lib/libadder_binding.dylib: Mach-O 64-bit dynamically linked shared library arm64
```

## The Node.js program

We can now build and run the Node.js program, see packages/node_app.

First we use pnpm workspaces to declare a dependency:
```
 "dependencies": {
        "bindings": "^1.5.0",
        "adder_lib": "workspace:*"
        ...
```

then use the `bindings` library to load `adder.node` which is a copy of our dynamic library (in a location Node.js will look for it).

```
% bazel run packages/node_app
INFO: Running command line: bazel-bin/packages/node_app/node_app_/node_app
5 + 3 = 8
```

There, our typescript program is calling our C code.
