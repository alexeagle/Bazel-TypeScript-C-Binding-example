load("@aspect_bazel_lib//lib:copy_file.bzl", "copy_file")
load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages(name = "node_modules")

ts_project(
    name = "index",
    srcs = ["index.ts"],
    deps = [
        ":node_modules/adder_lib",
        ":node_modules/bindings",
        ":node_modules/@types",
    ],
)

copy_file(
    name = "adder_binding",
    src = "//packages/adder_lib:adder_binding",
    out = "build/adder.node",
)

js_binary(
    name = "node_app",
    entry_point = "index.js",
    data = ["adder_binding"],
)
