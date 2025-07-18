load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages(name = "node_modules")

ts_project(
    name = "index",
    srcs = ["index.ts"],
    deps = [
        ":node_modules/adder_lib",
        ":node_modules/@types",
    ],
    tsconfig = {},
)

js_binary(
    name = "node_app",
    entry_point = "index.js",
    data = ["//packages/adder_lib:copy_binding"]
)
