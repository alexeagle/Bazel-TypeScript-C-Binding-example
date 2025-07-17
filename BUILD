"""Targets in the repository root"""
load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@gazelle//:def.bzl", "gazelle")
load("@npm//:defs.bzl", "npm_link_all_packages")

npm_link_all_packages(name = "node_modules")

# We prefer BUILD instead of BUILD.bazel
# gazelle:build_file_name BUILD
gazelle(name = "gazelle", gazelle = "@multitool//tools/gazelle")

js_library(
    name = "eslintrc",
    srcs = ["eslint.config.mjs"],
    visibility = ["//:__subpackages__"],
    deps = [
        ":node_modules/@eslint/js",
        ":node_modules/typescript-eslint",
    ],
)

js_library(
    name = "prettierrc",
    srcs = ["prettier.config.cjs"],
    deps = [],
    visibility = ["//tools/format:__pkg__"],
)

alias(
    name = "format",
    actual = "//tools/format",
)