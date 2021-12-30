import { typescript, javascript } from 'projen'

const authorName = 'Roman Filippov'

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'master',
  name: 'projen-turborepo',
  description: 'Projen project type for Turborepo monorepo setup.',
  keywords: [
    'projen',
    'turborepo',
    'turbo',
    'monorepo',
    'typescript',
  ],
  license: 'MIT',
  authorName,
  copyrightOwner: authorName,
  authorEmail: 'rf@romanfilippov.com',
  repository: 'https://github.com/moltar/projen-turborepo',
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.NPM,
  deps: [
    'turborepo',
  ],
  peerDeps: [
    'projen',
  ],
  releaseToNpm: true,
})

project.eslint?.addRules({
  semi: [
    'error',
    'never',
  ],
})

project.synth()
