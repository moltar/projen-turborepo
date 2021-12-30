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


  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
})

project.eslint?.addRules({
  semi: [
    'error',
    'never',
  ],
})

project.synth()
