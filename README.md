# Example of a Node.js TypeScript program calling C code

https://github.com/nodejs/node-gyp and https://github.com/cmake-js/cmake-js are both build systems for building a C or C++ library that can be consumed from Node.js.

Bazel can do this instead!

## The C library

The `packages/libadder` folder contains a simple C library that adds two numbers.
It includes a Node.js binding (adder_binding.cpp) and a TypeScript declaration file (adder.d.ts).

It also has a main entry point which we can use to verify the library works:

```shell
% bazel run //packages/libadder:main
...
INFO: Running command line: bazel-bin/packages/libadder/main
5 + 3 = 8
```

A second `cc_binary` target is added to build the binding library.
It compiles with static linking to produce a dynamic-linkable library (.so on linux, .dylib on macOS, .dll on Windows)

```shell
alexeagle@aspect-build type_script_c_make.js_example % bazel build //packages/libadder:adder_binding          
INFO: Analyzed target //packages/libadder:adder_binding (0 packages loaded, 0 targets configured).
INFO: Found 1 target...
Target //packages/libadder:adder_binding up-to-date:
  bazel-bin/packages/libadder/libadder_binding.dylib
INFO: Elapsed time: 0.220s, Critical Path: 0.00s
INFO: 1 process: 1 internal.
INFO: Build completed successfully, 1 total action
alexeagle@aspect-build type_script_c_make.js_example % file bazel-bin/packages/libadder/libadder_binding.dylib
bazel-bin/packages/libadder/libadder_binding.dylib: Mach-O 64-bit dynamically linked shared library arm64
```

## The Node.js binding

In the `packages/libadder` folder we also wrap the library in a Node.js binding.

First we declare a dependency:
```
 "dependencies": {
        "bindings": "^1.5.0",
        ...
```

then use the `bindings` library to load `adder.node` which is a copy of our dynamic library (in a location Node.js will look for it).

## Application

Finally we have `packages/node_app` which is a Node.js application that uses the `libadder` package.
It has type-checking of usage of the API and is also built by Bazel.

```
% bazel run packages/node_app
INFO: Running command line: bazel-bin/packages/node_app/node_app_/node_app
1 + 2 + 3 = 6
```

There, our TypeScript program is calling our C code!
