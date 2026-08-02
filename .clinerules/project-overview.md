# Actual Budget — Project Overview

**Actual Budget** is a local-first personal finance tool written in TypeScript/JavaScript. It's 100% free and open-source with synchronization capabilities across devices.

- **Repository**: https://github.com/actualbudget/actual
- **Community Docs**: Documentation is part of the monorepo at `packages/docs/`. Published at https://actualbudget.org/docs
- **License**: MIT
- **Primary Language**: TypeScript (with React)
- **Build System**: Yarn 4 workspaces (monorepo)

## Core Packages

| Package | Workspace name | Purpose |
| ------- | -------------- | ------- |
| `loot-core` | `@actual-app/core` | Core application logic (business logic, DB, calculations). Platform-agnostic; exports for browser and node. |
| `desktop-client` | `@actual-app/web` | React-based UI for web and desktop. E2E tests (Playwright), Vite bundling. |
| `desktop-electron` | `desktop-electron` | Electron wrapper for the desktop app. |
| `api` | `@actual-app/api` | Public API for programmatic access to Actual. |
| `sync-server` | `@actual-app/sync-server` | Synchronization server for multi-device support. Express-based; transitioning to TypeScript. |
| `component-library` | `@actual-app/components` | Reusable React UI components, theme system, icons. |
| `crdt` | `@actual-app/crdt` | CRDT implementation for data synchronization. |
| `plugins-service` | `plugins-service` | Service for handling plugins/extensions. |
| `eslint-plugin-actual` | `eslint-plugin-actual` | Custom lint rules (loaded as an oxlint JS plugin). |
| `docs` | `docs` | Documentation website (Docusaurus). |
| `cli` | `@actual-app/cli` | CLI for Actual Budget. |
| `mobile-client` | `mobile-client` | Capacitor-based iOS/Android app. |
| `vite-plugin-peggy` | `@actual-app/vite-plugin-peggy` | Vite plugin for Peggy grammars (used by loot-core). |
| `ci-actions` | `ci-actions` | CI helper package. |

## Task Orchestration with Lage

The project uses **lage** (a task runner for JavaScript monorepos) to run tests and other tasks across workspaces:

- **Parallel execution**: Runs tests in parallel across workspaces
- **Smart caching**: Caches test results to skip unchanged packages (cached in `.lage/`)
- **Dependency awareness**: Understands workspace dependencies and execution order
- **Continues on error**: Uses `--continue` flag to run all packages even if one fails

Configuration is in `lage.config.js` at the project root.

## Environment Requirements

- **Node.js**: >=22
- **Yarn**: ^4.9.1 (managed by `packageManager` field)
- **Browser Targets**: Electron >= 35.0, modern browsers (see browserslist)