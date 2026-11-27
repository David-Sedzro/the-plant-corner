# Ama's Plant Corner — EE03: Dev Tooling & Version Control

Website for Ama's Plant Corner, a plant shop in Accra. This README covers the setup explanation, the project conventions, the code review of my pair's pull request, and the workflow improvement I added.

**Repository:** [David-Sedzro/the-plant-corner](https://github.com/David-Sedzro/the-plant-corner)

**Team:** Alvin Etornam Laryea and David Sedzro

---

## Quick start

```bash
git clone https://github.com/David-Sedzro/the-plant-corner.git
cd the-plant-corner
npm ci
npm run dev          # local dev server with hot reload
npm run lint         # ESLint — flag likely bugs
npm run format:check # Prettier — verify formatting
npm run build        # production build to dist/
npm run preview      # serve the dist/ build locally
```

---

## 1. Setup explanation

### How we chose the base site

Before configuring any tooling, we agreed on which codebase to build on, we compared both codebase and running sites and chose **this codebase ([David-Sedzro/the-plant-corner](https://github.com/David-Sedzro/the-plant-corner))** because it has a clear separation of concerns, reusable components, and a maintainable structure that any new developer can understand quickly:

1. **Separation of concerns in CSS:** Styling is split into four focused files instead of one large stylesheet — `css/tokens.css` holds design tokens (`--color-primary`, `--space-2xl`, `--focus-ring-width`), `css/layout.css` defines shared page layout primitives (`.container`, `.section`, `.section--alt`), `css/components.css` styles reusable UI classes (such as `.site-header`, `.btn`, and product cards), and `css/styles.css` imports those three layers and sets base reset and typography rules.
2. **Shared styling across four HTML pages:** The site is organised into `index.html`, `shop.html`, `product-details.html`, and `care-tips.html`. They share the same header and footer patterns, design tokens, and component classes. This maps cleanly to Vite's multi-page configuration without restructuring files.
3. **Separated JavaScript responsibilities:** `js/theme.js` handles the saved/system color theme and theme toggle. `js/script.js` handles the homepage hero pause control and demo contact-form response. The mobile navigation uses native `<details>` markup and does not require JavaScript.
4. **Maintainability for a team:** When one developer updates a colour token in `css/tokens.css` and another updates a component in `css/components.css` or a script in `js/`, they work in separate files. A new developer can locate where any style or script belongs without guessing.

The tooling itself was set up on `feature/setup-dev-tooling` (PR #1) and reviewed before merging into `develop`, so both team members verified the configuration before building on top of it.

### Project structure

```
amas-plant-corner/
├── .github/
│   ├── workflows/ci.yml              # GitHub Actions CI
│   └── pull_request_template.md      # Standard PR template
├── .husky/
│   └── pre-commit                    # Pre-commit hook (runs lint-staged)
├── css/
│   ├── tokens.css                    # Design tokens (colours, spacing, type scale)
│   ├── layout.css                    # Page container and section layout rules
│   ├── components.css                # Reusable component styles (header, hero, cards)
│   └── styles.css                    # CSS entry point (imports layers + base reset)
├── dist/                             # Production build output (gitignored)
├── docs/
│   ├── ee01/
│   │   └── README.md                 # EE01 project documentation
│   ├── ee02/                         # EE02 accessibility audit and write-up
│   └── ee03/                         # EE03 setup notes
├── images/                           # Site images (about, category, hero, products)
├── js/
│   ├── theme.js                      # Dark mode — reads/writes localStorage, sets data-theme
│   └── script.js                     # Hero pause control and demo contact-form response
├── node_modules/                     # Installed npm packages (gitignored)
├── .gitignore
├── .prettierignore
├── care-tips.html                    # Care guidance
├── eslint.config.js
├── index.html                        # Home page
├── package-lock.json
├── package.json
├── product-details.html              # Individual product
├── README.md
├── shop.html                         # Shop listing
├── Sketched.png
└── vite.config.js
```

Splitting CSS across `tokens.css`, `layout.css`, `components.css`, and `styles.css` keeps a shared codebase maintainable: a single stylesheet quickly becomes a merge-conflict hotspot, whereas layered files make the intent of every diff immediately clear (`tokens.css` for design values, `components.css` for UI blocks).

### Conventions we followed

**Branches:** The reviewed PRs use `feature/<name>` and `bugfix/<name>` and target `develop`. The repository PR checklist currently lists those two prefixes. Keep it aligned with the current AmaliTech team conventions if other prefixes are approved.

**Commits:** Conventional Commits format — `type(scope): subject` in the present tense, lowercase, no trailing period, under 72 characters. Examples from this project's history:

```
chore(npm): add package.json and lockfile
chore(vite): add multi-page build config
chore(eslint): add flat config
ci(github): add github actions workflow
fix(scripts): add module type to script tags
```

The setup branch had 9 commits, each covering one tool or one decision. Focused commits make reviews, `git bisect`, and reverts easier to follow; atomic commits are a useful convention, not a requirement for those Git commands to work.

**Pull requests:** The PR template (`.github/pull_request_template.md`) provides a consistent structure — what the PR does, why it is needed, what changed, how it was tested, how the reviewer can test it, and whether there are breaking changes. GitHub supplies the template for new PRs, but does not enforce that contributors complete every section.

---

## 2. What each piece of the configuration does, and why it matters for a shared codebase

### `package.json` and `package-lock.json`

`package.json` lists every tool the project needs and the scripts to run them. `package-lock.json` records the exact version of every installed package — not just the direct dependencies, but their dependencies too.

Without a lockfile committed to version control, two developers running `npm install` on different days can get different versions of Vite or ESLint. A bug that appears on one machine and not another is often a version mismatch. Committing `package-lock.json` means `npm ci` (used in CI) installs exactly the same packages every time, on every machine.

The `"type": "module"` field tells Node.js to treat `.js` files as ES modules. This is required for `vite.config.js` to use `import` syntax, and it makes the project consistent: the same module system in the browser, in Node config files, and in scripts.

### Vite — `vite.config.js`

```js
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  input: {
    main: resolve(import.meta.dirname, "index.html"),
    shop: resolve(import.meta.dirname, "shop.html"),
    product: resolve(import.meta.dirname, "product-details.html"),
    care: resolve(import.meta.dirname, "care-tips.html"),
  },
});
```

Vite replaces Live Server. The difference matters for a team: Vite produces an optimised, minified `dist/` folder that any developer can verify with `npm run build`.

Vite 8's `input` configuration was used to define the application's four HTML entry points for the multi-page production build. Local JavaScript files were updated to use `type="module"` script tags, enabling Vite to include them in the build pipeline. The issue was fixed in the `bugfix/add-type-module-to-scripts` branch, and the resulting build now outputs all four HTML pages and their associated JavaScript assets.

### ESLint — `eslint.config.js`

```js
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["dist/", "node_modules/"]),
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  eslintConfigPrettier,
]);
```

`js/recommended` enables ESLint's recommended JavaScript rules, including checks for undefined names, unreachable code, and constant conditions. It is not a type checker and does not enable every possible correctness rule. `globals.browser` tells ESLint that `document`, `window`, and `localStorage` are legitimate globals, not typos.

`eslint-config-prettier` is placed last. It turns off ESLint rules that conflict with Prettier's formatting, leaving formatting checks to Prettier.

`dist/` and `node_modules/` are ignored because linting generated output is pointless and slow.

### Prettier — formatting

Prettier is an opinionated formatter with almost no configuration surface. The team does not decide how to format code; Prettier does. This is the right trade-off for a shared codebase: style disagreements do not make it into commits, reviewers spend their attention on logic rather than indentation, and diffs show only real changes.

`.prettierignore` excludes `package-lock.json` because npm generates and maintains that file. Formatting-only changes to its whitespace do not inherently break `npm ci`, but keeping generated lockfiles out of routine formatting avoids unnecessary diffs.

The `format:check` script (`prettier . --check`) is used in CI and in the `check` composite script. It exits with a non-zero code if any file is not formatted, so a PR with unformatted files fails CI before a reviewer sees it.

### Husky + lint-staged

```
# .husky/pre-commit
npx lint-staged
```

```json
"lint-staged": {
  "*.js": ["eslint --fix", "prettier --write"],
  "*.{html,css,json,md,yml}": "prettier --write"
}
```

Husky runs the pre-commit hook before a commit. lint-staged runs the configured commands only on matching staged files; not the whole codebase. This keeps the hook fast: committing one `.js` file does not lint every other file in the project.

The important detail is that lint-staged runs `--fix` and `--write`, not just `--check`. It auto-corrects fixable issues and stages the corrections. A commit is stopped if any configured command fails, including for errors that cannot be fixed automatically.

The critical limitation is that **hooks can be bypassed** with `git commit --no-verify`. Husky prevents accidents; it does not prevent deliberate circumvention. This is exactly why CI exists.

### GitHub Actions — `.github/workflows/ci.yml`

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run build
```

CI runs on a clean Ubuntu environment with no local editor configuration or plugins. It runs `npm ci`, which removes the existing `node_modules` directory and installs the dependency tree recorded in `package-lock.json`, then runs lint, format check, and build in sequence. If a step fails, the CI check fails. Whether that blocks merging depends on the repository's branch protection or ruleset settings.

The steps run sequentially. If one fails, later steps in the job do not run.

`cache: npm` caches the npm download cache between runs, so subsequent CI runs do not re-download every package from the registry.

---

## 3. Working project setup

**Pull request history:**

| PR                                                            | Branch                              | Reviewer             | Outcome                                                                                                                                                                                                                                        |
| ------------------------------------------------------------- | ----------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#1](https://github.com/David-Sedzro/the-plant-corner/pull/1) | `feature/setup-dev-tooling`         | Alvin Etornam Laryea | Approved and merged. The PR had 9 commits. Alvin noted the missing JavaScript in `dist/` and placeholder `npm test` script; the module-script issue was addressed in PR #2.                                                                    |
| [#2](https://github.com/David-Sedzro/the-plant-corner/pull/2) | `bugfix/add-type-module-to-scripts` | Alvin Etornam Laryea | Alvin raised a blocking comment because the dark-mode toggle was not visible on Shop and Plant Care. Adding `type="module"` allowed the theme script to initialize on those pages. The issue was resolved, and the PR was approved and merged. |
| [#3](https://github.com/David-Sedzro/the-plant-corner/pull/3) | `feature/add-pr-template`           | David Sedzro (me)    | I raised two non-blocking findings in a review comment. Alvin updated the template in `fd01a85`; the PR was approved and merged. Full review in §5 below.                                                                                      |

- **Version control:** all source code is tracked in Git. `dist/` and `node_modules/` are in `.gitignore`. `package-lock.json` is committed.
- **Automatic checks:** Husky is installed and configured to run `lint-staged` before each commit through a pre-commit hook. These checks can be bypassed using the `--no-verify` flag. GitHub Actions runs lint, format, and build validation on pushes and pull requests. The recorded `check` workflow runs for PRs #1, #2, and #3 completed successfully.
- **Predictable build:** `npm run build` produces the same output on any machine. Exact dependency versions are pinned in `package-lock.json`. `npm ci` enforces that lockfile in CI.
- **History:** branch names follow `type/short-description`. Commit messages follow `type(scope): subject`. PRs target `develop` and use the team's template.

---

## 4. My pull requests

### PR #1 — Development tooling

**Branch:** `feature/setup-dev-tooling`

**Outcome:** Approved by Alvin Etornam Laryea and merged into `develop`.

I added npm scripts and a lockfile, Vite, ESLint, Prettier, a Husky pre-commit hook using lint-staged, and a GitHub Actions workflow. The PR had nine focused commits. The reviewer confirmed the setup and noted two follow-ups: the production build did not yet include JavaScript because the script tags lacked `type="module"`, and `npm test` was still a placeholder. PR #2 addressed the JavaScript bundling issue; the test script remains a placeholder.

**Alvin's review:** [Approved review](https://github.com/David-Sedzro/the-plant-corner/pull/1#pullrequestreview-6061220956)

> **issue (blocking):** “The tooling setup looks good. The lockfile and npm scripts are in place, ESLint passes, Husky and lint-staged are configured correctly, CI runs the necessary checks, and Vite successfully generates all four HTML pages. I haven't noticed any other major issues. The only concern is that the production build is missing the JavaScript files, which could affect the site's functionality. The npm test script is still a placeholder, but I don't consider that a major issue at this stage.”

The recorded GitHub Actions `check` runs for this PR succeeded. The checks covered linting, formatting, and the production build.

### PR #2 — Bundle JavaScript modules and Branch protection

**Branch:** `bugfix/add-type-module-to-scripts`

**Outcome:** Approved by Alvin Etornam Laryea and merged into `develop`.

I added `type="module"` to the local JavaScript script tags in all four HTML pages. This lets Vite process and bundle the scripts for the production build. During review, Alvin reported that the dark-mode toggle was not visible on the Shop and Plant Care pages; loading the theme script as a module resolved that issue.

**Alvin's review comment:** [Blocking issue](https://github.com/David-Sedzro/the-plant-corner/pull/2#issuecomment-7212775055)

> **issue (blocking): Dark mode toggle is still missing on the Shop and Plant Care pages.**
>
> I tested all four pages using `npm run preview`, as requested in the PR's testing instructions. However, the issue is still present on the **Shop** and **Plant Care** pages.
>
> On both pages, dark mode appears to be enabled automatically, but the theme toggle icon is not visible in the navbar. As a result, users have no way to switch back to light mode.
>
> This means the reported fix is incomplete, as the theme toggle is not functioning consistently across all four pages.

After the module-script changes were verified, Alvin approved the PR.

I verified the four-page production build and its JavaScript assets, previewed the pages and theme toggle, and ran lint and formatting checks. The recorded GitHub Actions `check` runs for this PR succeeded.

---

## 5. Code review: My pair's pull request

**PR reviewed:** [PR #3 — `feature/add-pr-template`](https://github.com/David-Sedzro/the-plant-corner/pull/3) opened by [@laryea-0](https://github.com/laryea-0)
**Comments**

This PR adds `.github/pull_request_template.md` — a Markdown file GitHub loads automatically whenever anyone opens a pull request. The PR is a single-file addition with no changes to source code or configuration.

---

**Finding 1 — Stray "Pull Request Title" heading at the top of the template**
**Category: non-blocking (issue)**

The original template opened with a heading like `## Pull Request Title`, which would appear as literal body text inside every PR description. GitHub renders a PR's title in a dedicated field above the description; there is no mechanism for a template to populate that field. The heading is therefore noise that makes every PR description look malformed from the moment it is opened.

This is non-blocking because the site works, CI passes, and the stray line is cosmetic — a reviewer can still read and act on the PR. But it is a real defect in the template: the one thing it teaches developers to do — write a title — it teaches them to do in the wrong place, so every PR silently wastes a line.

Alvin removed the heading in commit `fd01a85` before the PR merged. The finding was resolved.

---

**Finding 2 — Template length and scope mismatch**
**Category: non-blocking (suggestion)**

The original template had approximately 30 checklist items, including sections for unit tests, links to external issue trackers, and other items this project does not use. A template only helps if people actually read it and fill it in. A 30-item checklist in a project with no test runner and no issue tracker is more likely to be cleared by habit than by thought. Checklist fatigue is a documented failure mode: the longer the list, the more items get ticked without being read.

This is a suggestion, not a must-change, for two reasons. First, an over-long template does not break anything — it is better than no template at all. Second, what belongs in a team's template is a team decision, not a reviewer decision. I raised it because there is a real risk (rubber-stamping), but I did not block the PR on it.

Alvin updated the template in `fd01a85` to tighten the sections. The PR was then approved and merged.

---

**Overall verdict: approved after updates**

The PR does what it says. A pull request template committed to `.github/` is a sound workflow improvement — GitHub loads it automatically and it costs nothing once it is in place. Both issues I raised were non-blocking, and Alvin addressed them in the same PR before merge. The final template is usable and appropriate for the project's current scope.

A reviewer who finds little to block is not failing to look hard enough. This was a one-file change with a clear, correct purpose. The findings I raised were genuine — one structural defect that would have made every PR look broken, one risk of reduced effectiveness over time — but neither warranted holding up the merge.

---

## 6. Workflow improvements: PR template and branch protection

**What the problem is**

Pull request descriptions in this project were inconsistent before PR #3. Without a template, some PRs had a one-line description, others had nothing at all. A reviewer looking at a PR has to guess: what was the intent? What was tested? Is there a breaking change? Time spent asking those questions is time not spent reviewing the code.

An inconsistent PR history also causes a downstream problem: six months later, `git log` and the GitHub PR list become an unreliable record of what changed and why. A new developer joining the team cannot reconstruct the reasoning behind past decisions.

**What was implemented**

`.github/pull_request_template.md` — a Markdown file GitHub supplies as a starting point when someone opens a PR in this repository. It prompts authors to provide:

1. What does this PR do?
2. Why is this change needed?
3. What changes were made?
4. How was it tested?
5. How can the reviewer test this?
6. Are there any breaking changes?
7. Related issue or ticket
8. Screenshots / visual evidence

The final section is a checklist: branch naming, commit format, self-review of the diff, and confirmation that no generated files or secrets are included.

### Branch protection

Branch protection is also enabled for `develop` through GitHub repository settings. It complements the PR template and CI by applying repository-side merge rules. The specific requirements, such as required status checks or reviews, are configured in GitHub and are not stored in this repository's files.

**Who it protects**

The template helps the **reviewer** by prompting for context to understand the change without reading every commit message or chasing the author for clarification. It helps the **author** remember common PR checks — branch naming, screenshots when applicable, and avoiding generated files or secrets — but it does not automatically validate these items.

It also protects anyone who joins the project later. The PR history becomes a readable record of decisions, not a list of commit hashes. The template is in version control, so it cannot be lost, and it applies to every PR automatically — including from contributors who have not read this README.

**Why it belongs in the project permanently**

The alternative is a written convention in a document that everyone has to remember to read and follow. Documents drift. A template makes the prompts available in the PR workflow, though authors still need to complete them. The cost is one file and a few extra seconds per PR. The benefit compounds with every pull request the project ever receives.

---

## Further reading

- [`docs/ee03/ee03-setup.md`](docs/ee03/ee03-setup.md) — development environment and team setup notes.
