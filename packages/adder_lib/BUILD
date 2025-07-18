load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_bazel_lib//lib:copy_file.bzl", "copy_file")

npm_link_all_packages(name = "node_modules")

cc_library(
    name = "adder",
    srcs = ["adder.c"],
    hdrs = ["adder.h"],
)

cc_binary(
    name = "main",
    srcs = ["main.c"],
    deps = [":adder"],
)

cc_binary(
    name = "adder_binding",
    srcs = ["adder_binding.c"],
    linkshared = True,
    linkstatic = True,
    visibility = ["//visibility:public"],
    linkopts = [
        "-undefined", "dynamic_lookup",  # required on macOS
    ],
    deps = [
        ":adder",
        "@rules_nodejs//nodejs/headers:current_node_cc_headers", # keep
    ],
)

ts_project(
    name = "ts_wrapper",
    srcs = ["adder.ts"],
    declaration = True,
    deps = [
        ":node_modules/bindings",
        ":node_modules/@types",
    ],
    visibility = ["//visibility:public"],
)

copy_file(
    name = "copy_binding",
    src = ":adder_binding",
    out = "build/adder.node",
    visibility = ["//visibility:public"],
)

js_library(
    name = "pkg",
    srcs = ["adder.js", "adder.d.ts", "package.json"],
    visibility = ["//visibility:public"],
)