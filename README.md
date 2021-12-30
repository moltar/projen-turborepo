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
import { TypeScriptProject } from 'projen'

const turbo = new TurborepoProject({
  name: 'my-monorepo',
  turbo: {
    baseBranch: 'origin/master',
    pipeline: {
      // ... your pipeline config, but defaults are already included
    },
  },
})

const firstProject = new TypeScriptProject({
  name: 'my-first-project',
  parent: turbo,
  // ...
})

turbo.synth()
```
