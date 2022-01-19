# 📦 `projen-turborepo`

> [Projen](https://github.com/projen/projen) project type for [Turborepo](https://turborepo.org/) [monorepo](https://en.wikipedia.org/wiki/Monorepo) setup.

## Getting Started

To create a new project, run the following command and follow the instructions:

```sh
$> mkdir my-monorepo
$> cd my-monorepo
$> npx projen new --from projen-turborepo --projenrc-ts
🤖 Synthesizing project...
...
```

## Example

```ts
import { TurborepoProject } from 'projen-turborepo'
import { typescript } from 'projen';

const turbo = new TurborepoProject({
  name: 'my-monorepo',
  turbo: {
    pipeline: {
      // ... your pipeline config, but defaults are already included
    },
  },

  // this will probably all be true by default in the future, but for now all of these
  // are experimental and need to be explicitly turned on.
  pathMapping: true,
  jestModuleNameMapper: true,
  projectReferences: true,
})

new typescript.TypeScriptProject({
  parent: turbo,
  defaultReleaseBranch: 'master',
  name: 'my-first-project',
  outdir: 'packages/my-first-project',
  // ...
})

turbo.synth()
```

Then use `turbo` to run the tasks:

```plain
$> turbo run test
• Packages in scope: my-first-project
• Running test in 1 packages
my-first-project:test: cache hit, replaying output 2264dbd676fac83e
my-first-project:test: yarn run v1.22.11
my-first-project:test: $ npx projen test
my-first-project:test: ----------|---------|----------|---------|---------|-------------------
my-first-project:test: File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
my-first-project:test: ----------|---------|----------|---------|---------|-------------------
my-first-project:test: All files |     100 |      100 |     100 |     100 |
my-first-project:test:  index.ts |     100 |      100 |     100 |     100 |
my-first-project:test: ----------|---------|----------|---------|---------|-------------------
my-first-project:test: Done in 4.29s.
my-first-project:test: 👾 test | jest --passWithNoTests --all --updateSnapshot
my-first-project:test: PASS test/hello.test.ts
my-first-project:test:   ✓ hello (1 ms)
my-first-project:test:
my-first-project:test: Test Suites: 1 passed, 1 total
my-first-project:test: Tests:       1 passed, 1 total
my-first-project:test: Snapshots:   0 total
my-first-project:test: Time:        1.148 s, estimated 2 s
my-first-project:test: Ran all test suites.
my-first-project:test: 👾 test » eslint | eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern src test build-tools .projenrc.js

 Tasks:    1 successful, 1 total
Cached:    1 cached, 1 total
  Time:    65ms >>> FULL TURBO
```
