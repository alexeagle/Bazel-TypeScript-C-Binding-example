load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

"""Definition of linter tools

This is in its own package because it has so many loading-time symbols,
we don't want to trigger eager fetches of these for builds which aren't running linters.
"""

load("@bazel_skylib//rules:native_binary.bzl", "native_binary")
load("@npm//:eslint/package_json.bzl", eslint_bin = "bin")

package(default_visibility = ["//:__subpackages__"])

eslint_bin.eslint_binary(name = "eslint")

native_binary(
    name = "clang_tidy",
    src = select(
        {
            "@bazel_tools//src/conditions:linux_x86_64": "@llvm_toolchain_llvm//:bin/clang-tidy",
            "@bazel_tools//src/conditions:linux_aarch64": "@llvm_toolchain_llvm//:bin/clang-tidy",
            "@bazel_tools//src/conditions:darwin_x86_64": "@llvm_toolchain_llvm//:bin/clang-tidy",
            "@bazel_tools//src/conditions:darwin_arm64": "@llvm_toolchain_llvm//:bin/clang-tidy",
            # llvm_toolchain doesn't support windows: https://github.com/bazel-contrib/toolchains_llvm/issues/4
            # as a workaround, you can download exes from
            # https://github.com/llvm/llvm-project/releases/tag/llvmorg-18.1.6 and make available locally.
            "@bazel_tools//src/conditions:windows_x64": "clang-tidy.exe",
        },
    ),
    out = "clang_tidy",
)

bzl_library(
    name = "linters",
    srcs = ["linters.bzl"],
    deps = [
        "@aspect_rules_lint//lint:clang_tidy",
        "@aspect_rules_lint//lint:eslint",
        "@aspect_rules_lint//lint:lint_test",
        "@aspect_rules_lint//lint:shellcheck",
    ],
)
