# Code Style & Conventions

## TypeScript Guidelines

**Type Usage:**

- Use TypeScript for all code; look for existing type definitions before adding new ones
- Prefer `satisfies` over type assertions (`as`, `!`) for narrowing

**Naming:**

- Use descriptive variable names with auxiliary verbs (e.g., `isLoaded`, `hasError`)

**Code Structure:**

- Functional and declarative programming patterns - avoid classes
- Use the `function` keyword for pure functions
- Prefer iteration and modularization over code duplication
- Structure files: exported component/page, helpers, static content, types
- Create new components in their own files

**Type Strictness:**

- New files must be type-strict — don't add `// @ts-strict-ignore` to a new file (existing files are grandfathered)

**React Patterns:**

- The project uses **React Compiler** (`babel-plugin-react-compiler`) in all app packages with React code (desktop-client, component-library). The compiler auto-memoizes component bodies, so you can omit manual `useCallback`, `useMemo`, and `React.memo` when adding or refactoring code; prefer inline callbacks and values unless a stable identity is required by a non-compiled dependency.
- Avoid unstable nested components

**JSX Style:**

- Declarative JSX, minimal and readable
- Avoid unnecessary curly braces in conditionals
- Use concise syntax for simple statements
- Prefer explicit expressions (`condition && <Component />`)

## Platform-Specific Code

- Use conditional exports in `loot-core` for platform-specific code; platform resolution happens at build time via package.json exports. Don't directly import another platform's modules (`.api`, `.electron`).

## Internationalization (i18n)

- Use the `Trans` component (and translated strings) for user-facing text.
- Regenerate i18n files with `yarn generate:i18n`.

## Financial Number Typography

- Wrap standalone financial numbers with `FinancialText` (or `styles.tnum` where wrapping isn't possible).

## Linting & Formatting

- The project uses **oxlint** (with `oxfmt` for formatting). Custom `actual/*` rules are loaded as oxlint JS plugins from `packages/eslint-plugin-actual`.
- Run `yarn lint:fix` to auto-fix lint and formatting issues.

## Auto-Generated Files (Don't Edit)

- Icons in `packages/component-library/src/icons/` are auto-generated. Don't manually edit them.
- Build artifacts in `packages/*/lib-dist/`, `packages/*/dist/`, `packages/*/build/` are generated. Don't edit.