---
name: committing-actual-changes
description: Use whenever creating, drafting, finalizing, or amending a git commit or a pull request in the Actual Budget repo (actualbudget/actual) — including phrases like "commit this", "make a commit", "stage and commit", "open a PR", "create a pull request", "send this for review", "push these changes", "ship it", "submit a PR", "raise a PR", or any time finishing implementation work in this repo where committing or opening a PR is the natural next step. Also trigger when the user mentions the `[AI]` prefix, the PR template, git hooks, or `--no-verify` in this repo. The repo enforces strict, non-obvious rules for AI-generated contributions (mandatory `[AI]` prefix on every commit message and PR title, leaving the PR template blank, never skipping hooks, specific git-safety constraints, a pre-commit quality checklist) and not following them produces commits and PRs that have to be redone or manually fixed by a maintainer.
---

# Committing Changes in actualbudget/actual (Cline workflow)

Before creating any git commit or pull request in this repo, read:

**`.github/agents/pr-and-commit-rules.md`**

It is the authoritative source for the rules you must apply yourself: the `[AI]` PR-title prefix and leaving the PR template blank (and the Chinese exception). The mechanical commit/git rules are enforced by tooling and aren't restated there. Read it on every commit/PR session so any updates are picked up automatically.

Also read the local rules: **`.clinerules/commit-and-pr-rules.md`** and **`.clinerules/release-notes.md`**.

## The one rule worth restating

Every commit message and every pull request title MUST begin with `[AI]`. Commit messages are checked by the git-guard hook (a missing prefix is blocked before the commit lands), so the one that needs _your_ attention is the PR title — nothing checks it for you, and the cost of forgetting it is high since the PR has to be renamed by hand. Examples:

- `[AI] Fix type error in account validation` — correct
- `Fix type error in account validation` — wrong, missing prefix

The PR-template rule and the rest live in the rules file. Read it before each commit/PR rather than relying on this workflow's summary, because the rules file evolves and this workflow deliberately does not restate it.

## Workflow steps

### 1. Read the rules

- Read `.github/agents/pr-and-commit-rules.md` (authoritative).
- Read `.clinerules/commit-and-pr-rules.md` and `.clinerules/release-notes.md`.

### 2. Pre-commit quality gate

Run from the repo root (never in child workspaces):

- `yarn typecheck`
- `yarn lint:fix`
- Relevant tests (`yarn test`, or workspace-specific tests for the changed package)

### 3. Review the diff

- Confirm only intended files are staged.
- No generated files: build artifacts (`packages/*/lib-dist/`, `packages/*/dist/`, `packages/*/build/`), auto-generated icons (`packages/component-library/src/icons/`), lockfile churn unrelated to the change.
- User-facing strings are translated (i18n) — regenerate with `yarn generate:i18n` if needed.

### 4. Release note check

- If the change is user-facing, confirm a release note exists in `upcoming-release-notes/` (see `.clinerules/release-notes.md`). If missing, create one.

### 5. Craft the commit message

- Conventional Commits format. Small, focused, atomic.
- **Prefix with `[AI]`** — e.g. `[AI] Fix type error in account validation`.

### 6. Commit with hooks

- **Never use `--no-verify`.** Let the git-guard hook and `nano-staged` (oxfmt + oxlint) run.

### 7. Opening a PR (if applicable)

- **PR title MUST be prefixed with `[AI]`** — nothing checks this for you.
- **Leave the PR template blank** — do not fill in `.github/PULL_REQUEST_TEMPLATE.md`; leave all placeholders and checkboxes untouched. (Exception: if a human explicitly asks you to fill it out, do so in Chinese 简体中文.)
- **Apply the `AI generated` label.**
- **Prefix any GitHub comments/reviews/issues with 🤖** (first character) — but NOT PR titles or commit messages (those use `[AI]`).

## Why this matters

Maintainers triage AI-authored contributions separately, and the `[AI]` prefix is what makes that triage fast — it also drives the automatic `"AI generated"` PR label, so getting the prefix right is the one action that gates the whole triage path. Without it the PR looks like a normal human contribution and the wrong review process gets applied. The "do not fill in the PR template" rule exists because the human is the one who actually tested the change and can write the Description / Testing / Checklist sections honestly — an AI-filled template misrepresents who did what.

The rules file is short. Read it.
