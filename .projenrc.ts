import { typescript, javascript } from 'projen'

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
  copyrightOwner: 'Roman Filippov',
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.NPM,
  deps: [
    'turborepo',
  ],
  peerDeps: [
    'projen',
  ],
})

project.eslint?.addRules({
  semi: [
    'error',
    'never',
  ],
})

project.synth()
