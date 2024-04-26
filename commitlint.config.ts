module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "remove",
        "style",
        "chore",
        "init",
        "refactor",
        "test",
        "revert",
        "docs",
        "ci",
        "merge"
      ]
    ]
  }
};
