import { javascript, cdk } from 'projen'

const authorName = 'Roman Filippov'
const authorAddress = 'rf@romanfilippov.com'
const repository = 'https://github.com/moltar/projen-turborepo'
const projen = 'projen@^0.52.31'

const project = new cdk.JsiiProject({
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
  repositoryUrl: repository,
  repository: repository,
  authorName,
  author: authorName,
  copyrightOwner: authorName,
  authorAddress: authorAddress,
  authorEmail: authorAddress,
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.NPM,
  bundledDeps: ['dotalias'],
  peerDeps: [
    projen,
  ],
  devDeps: [
    projen,
    'yaml',
    '@types/yaml',
    'turbo@latest',
  ],
  releaseToNpm: true,
  depsUpgrade: false,
})

project.eslint?.addRules({
  semi: [
    'error',
    'never',
  ],
})

project.synth()
