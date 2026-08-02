# Release Notes

Release notes are the changelog entries that ship with a code change. They live as Markdown files in `upcoming-release-notes/` and are published for humans to read, so they must be short, plain-language, and free of technical detail.

## When to Add One

Add a release note for any **user-facing change** (new feature, enhancement, bugfix). Internal-only changes (Maintenance) may also get one but should be phrased non-technically.

## How to Create One

You can scaffold a release note interactively:

```bash
yarn generate:release-notes
```

Or create the file manually.

## File Naming

- Name each file with a short, descriptive slug, e.g. `add-payee-autocomplete.md`.
- The PR link is resolved automatically at release time, so you don't need the PR number.
- Numeric filenames like `1234.md` also remain valid.

## File Format

The file contains front matter with a `category` key (defining which header to put the entry under) and an `authors` key (defining the author of the entry). The body is the changelog entry.

```markdown
---
category: Features
authors: [YourGitHubUsername]
---

Add option to include exchange rate multiplier during import
```

## Valid Categories

- `Features`: New features
- `Enhancements`: Improvements to existing features
- `Bugfix`: Bug fixes
- `Maintenance`: Internal changes that don't directly affect users

## Style Rules

- Keep it short and clear — ideally one sentence.
- Non-technical (unless the category is "Maintenance").
- Phrase as a command: "Add option to include exchange rate multiplier during import" — not "Added option to…" or "Adds option to…".
- Generally match the PR title, but you can change it if it's clearer.
- The `authors` key should be an array of GitHub usernames of the people who contributed (usually just you).