load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_image_layer")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@rules_oci//oci:defs.bzl", "oci_image")

npm_link_all_packages(name = "node_modules")

ts_project(
    name = "index",
    srcs = ["index.ts"],
    deps = [
        ":node_modules/libadder",
        ":node_modules/@types",
    ],
    tsconfig = {},
)

js_binary(
    name = "node_app",
    entry_point = "index.js",
    data = ["//packages/libadder:copy_binding"]
)

platform(
    name = "linux_amd64",
    constraint_values = [
        "@platforms//os:linux",
        "@platforms//cpu:x86_64",
    ],
)

platform(
    name = "linux_arm64",
    constraint_values = [
        "@platforms//os:linux",
        "@platforms//cpu:arm64",
    ],
)

js_image_layer(
    name = "layers",
    binary = ":node_app",
    platform = select({
        "@platforms//cpu:arm64": ":linux_arm64",
        "@platforms//cpu:x86_64": ":linux_amd64",
    }),
    root = "/app",
    tags = ["no-remote-exec"],
    visibility = ["//visibility:__pkg__"],
)


oci_image(
    name = "image",
    # Since js_binary depends on bash we have to bring in a base image that has bash
    base = "@debian",
    # This is `/[js_image_layer 'root']/[package name of js_image_layer 'binary' target]/[name of js_image_layer 'binary' target]`
    cmd = ["/app/packages/node_app/node_app"],
    entrypoint = ["/usr/bin/bash"],
    tars = [
        ":layers",
    ],
    visibility = ["//visibility:public"],
    # This is `cmd` + `.runfiles/[workspace name]`
    workdir = "/app/src/bin.runfiles/_main",
)
