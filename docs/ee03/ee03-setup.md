# EE03: Development environment setup

This project uses npm for dependency management and Vite for local development and production builds. ESLint checks JavaScript, Prettier maintains consistent formatting, Husky and lint-staged run checks for staged files, and GitHub Actions validates changes in CI.

## Prerequisites

- Node.js 24
- npm
- Git
- Visual Studio Code

Check the installed versions:

```bash
node --version
npm --version
git --version
```

## Install the project

Clone the repository and install dependencies from the repository root:

```bash
npm ci
```

Use `npm ci` for a clean, reproducible installation. It uses the versions recorded in `package-lock.json`.

## Development

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Project configuration

### npm

`package.json` defines the scripts and development dependencies. `package-lock.json` records the exact dependency tree.

### Vite

`vite.config.js` defines Vite configuration and the multi-page build inputs.

### ESLint

`eslint.config.js` configures ESLint for the project's JavaScript files.

### Prettier

Prettier maintains consistent formatting. `.prettierignore` identifies files that Prettier should not check.

## npm scripts

| Command                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the Vite development server.             |
| `npm run build`        | Create the production build in `dist/`.        |
| `npm run preview`      | Preview the production build locally.          |
| `npm run lint`         | Run ESLint across the project.                 |
| `npm run format:check` | Check whether files match Prettier formatting. |
| `npm run format`       | Format the project with Prettier.              |
| `npm run check`        | Run linting and the Prettier check.            |

Run the following before creating a pull request:

```bash
npm run check
npm run build
```

## Pre-commit validation

Husky installs the Git hooks during npm installation.

The pre-commit hook runs `lint-staged`, which applies ESLint and Prettier fixes to staged JavaScript files and Prettier to staged HTML, CSS, JSON, and Markdown files.

To run the staged-file checks manually:

```bash
npx lint-staged
```

Commits may be blocked if staged files do not pass the configured checks.

## GitHub Actions CI

`.github/workflows/ci.yml` runs validation for pushes and pull requests.

The workflow:

1. Checks out the repository.
2. Installs Node.js 24.
3. Restores the npm dependency cache.
4. Runs `npm ci`.
5. Runs ESLint.
6. Runs the Prettier formatting check.
7. Builds the site with Vite.

CI must pass before merging changes into the `develop` branch.

## Branch naming

Use a short, descriptive branch name with a category prefix that explains the work:

```text
<type>/<short-description>
```

For example:

```text
bugfix/type-error
```

Use `fix/` for bug fixes, `feat/` for new functionality, and `docs/` for documentation-only changes. Keep the description lowercase and use hyphens between words, such as `fix/product-price-type`.

## Production build

Create a production build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

Vite writes the build output to `dist/`. The `dist/` directory is generated and should not be committed.
