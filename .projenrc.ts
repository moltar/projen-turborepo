import { javascript, cdk } from 'projen'

const authorName = 'Roman Filippov'
const authorAddress = 'rf@romanfilippov.com'
const repository = 'https://github.com/moltar/projen-turborepo'

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
  peerDeps: [
    'projen@0.50.2',
  ],
  devDeps: [
    'projen@0.50.2',
  ],
  releaseToNpm: true,
})

// Ignore files from `dist/*`
// See: https://github.com/projen/projen/issues/1441
project.jest?.addIgnorePattern('<rootDir>/dist/*')

project.eslint?.addRules({
  semi: [
    'error',
    'never',
  ],
})

project.synth()
