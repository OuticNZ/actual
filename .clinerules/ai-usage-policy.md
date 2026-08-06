# AI Usage Policy

Actual Budget welcomes contributions created with the help of AI tools, but there are clear expectations. Canonical source: `packages/docs/docs/contributing/ai-usage-policy.md`.

## Code Standards

Regardless of whether code is written by a human or an AI, it must meet the project's standards:

- It must pass `yarn typecheck` and `yarn lint:fix`.
- Relevant tests should pass (`yarn test`).
- It must follow the project's code style and conventions (see `code-style.md`).
- User-facing strings must be translated (i18n).

## Disclose When AI Was Used

If AI was used to generate a significant portion of an issue, PR, or the code it contains, say so in the submission. A short note in the PR description is enough — for example, "The initial implementation was drafted with Claude and then reviewed and edited by me."

Issues and PRs that appear to be AI-generated but do not disclose it may be closed without review.

## Quality Over Quantity

- Do not open many pull requests at once. A stack of simultaneous, similar PRs takes much longer to review and is often a sign the work was not read or tested by a human.
- A good rhythm: open one PR, work with maintainers to get it reviewed and merged, then open the next.
- Low-effort, untested, or undisclosed AI output may be closed without a detailed review.

## You Are Responsible for What You Submit

Before opening an issue or PR:

- **Understand the code.** Read what the AI produced. Be able to explain what each change does and why it is needed.
- **Verify it works.** Run it locally, run the tests, and confirm the behavior you are claiming.
- **Edit the prose.** AI-generated descriptions are often long, repetitive, or inaccurate. Trim them and make sure they match what the code actually does.

You are the author of the contribution. The AI is not.

## Interacting with Maintainers Should Be Human

- Do not paste a reviewer's comment back into an AI and post the raw output as your reply.
- Do not generate issue or PR descriptions wholesale from AI without reading and editing them yourself.
- Do not use AI to argue with maintainers on your behalf.

## Autonomous AI Agent Rules

Autonomous AI agents operating directly on this repository must:

- Prefix commits and PR titles with `[AI]` (see `commit-and-pr-rules.md`).
- Apply the `AI generated` label to PRs.
