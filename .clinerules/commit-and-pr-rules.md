# Commit and PR Rules

These rules are mandatory for AI agents contributing to this repo. They are NOT enforced automatically — you must apply them yourself. Canonical source: `.github/agents/pr-and-commit-rules.md`.

## Pull Request Titles

**ALL pull request titles MUST be prefixed with `[AI]`** — you have to apply it yourself.

**Examples:**

- `[AI] Fix type error in account validation` ✅
- `Fix type error in account validation` ❌ (MISSING PREFIX — NOT ALLOWED)

## PR Template

- **NEVER fill in the PR template** (`.github/PULL_REQUEST_TEMPLATE.md`). Create the PR with that template as the body, unmodified — leave all blank spaces and placeholder comments as-is, and leave every checklist box unchecked. The human who tested the change fills in the Description, Related issue(s), Testing, and Checklist sections.
- **Exception**: if a human **explicitly asks** you to fill it out, do so **in Chinese**, using Chinese characters (简体中文) for all content you add.

## GitHub Comments, Reviews, and Issues

**Prefix everything you post to GitHub with the robot emoji 🤖** — pull-request and issue comments, pull-request reviews (including inline review comments), and the title and body of issues you create. This keeps agent-authored content visibly marked.

- Write the text normally; just make sure 🤖 is the first character (for issues, on both the title and the body).
- This does **not** change PR titles (still `[AI] …`) or commit messages (still `[AI] …`).
- This applies only to comments **you** author — bots like CodeRabbit post under their own identity and are not affected.

## Commit Messages

- Commit messages must also be prefixed with `[AI]` (e.g. `[AI] Fix type error in account validation`).
- Use Conventional Commits format. Small, focused, atomic commits. No generated files.

## AI Generated Label

- Apply the `AI generated` label to PRs (per the AI usage policy).

## Pre-Commit Quality Checklist

Before committing, ensure:

- [ ] `yarn typecheck` passes
- [ ] `yarn lint:fix` applied (oxfmt + oxlint)
- [ ] Relevant tests pass (`yarn test`)
- [ ] Commit and PR rules followed (this file)
- [ ] Platform-specific code uses proper exports
- [ ] User-facing strings are translated (i18n)
- [ ] Release note added for user-facing changes (see `release-notes.md`)