load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")
load("@aspect_rules_js//js:defs.bzl", "js_library")

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

js_library(
    name = "pkg",
    srcs = [
        "adder.d.ts",
        "package.json",
    ],
    visibility = ["//visibility:public"],
)