# Commands

**ALWAYS run yarn commands from the repo root** — never run them in child workspaces. Use `yarn workspace <workspace-name> run <command>` for workspace-specific tasks.

## Essential Commands

```bash
# Type checking (ALWAYS run before committing)
yarn typecheck

# Linting and formatting (with auto-fix)
yarn lint:fix

# Run all tests (lage across all workspaces)
yarn test

# Run tests without cache (for debugging/CI)
yarn test:debug

# Start development server (browser)
yarn start

# Start with sync server
yarn start:server-dev

# Start desktop app development
yarn start:desktop
```

## Testing

```bash
# Run all tests across all packages (using lage)
yarn test

# Run tests without cache (for debugging)
yarn test:debug

# Run tests for a specific package
yarn workspace @actual-app/core run test

# E2E tests for web
yarn e2e

# Desktop Electron E2E (includes full build)
yarn e2e:desktop

# Visual regression tests
yarn vrt

# Visual regression in Docker (consistent environment)
yarn vrt:docker

# E2E test for a specific file
yarn workspace @actual-app/web run playwright test accounts.test.ts --browser=chromium

# Run specific E2E test with headed browser
yarn workspace @actual-app/web run playwright test --headed --debug accounts.test.ts
```

## Building for Production

```bash
# Browser build
yarn build:browser

# Desktop build
yarn build:desktop

# API build
yarn build:api

# Sync server build
yarn build:server
```

## i18n & Release Notes

```bash
# Regenerate i18n files
yarn generate:i18n

# Scaffold a release note
yarn generate:release-notes
```

## Workspace Commands Reference

```bash
# List all workspaces
yarn workspaces list

# Run command in specific workspace
yarn workspace <workspace-name> run <command>

# Run command in all workspaces
yarn workspaces foreach --all run <command>

# Install production dependencies only (for server deployment)
yarn install:server
```

## Troubleshooting

- **Lage cache issues**: Clear cache with `rm -rf .lage` if tests behave unexpectedly
- **Tests continue on error**: With `--continue` flag, all packages run even if one fails
- **Build failures**: Clean build artifacts with `rm -rf packages/*/dist packages/*/lib-dist packages/*/build`, then `yarn install`
- **Pre-commit hook**: Runs `nano-staged` (oxfmt + oxlint, configured in `.nano-staged.json`) via Husky. Run `yarn prepare` once after install to set up hooks.