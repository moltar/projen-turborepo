import { typescript, javascript } from 'projen'

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'master',
  name: 'projen-turborepo',
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
