import { tmpdir } from 'os'
import path from 'path'
import { typescript, javascript, Project, Testing } from 'projen'
import yaml from 'yaml'
import { TurborepoProject, TurborepoProjectOptions } from '../src'

const createProjectName = (name?: string) => [name, Math.random().toString().replace('.', '')].join('-')

export function createProject(options: Partial<TurborepoProjectOptions> = {}) {
  const name = createProjectName(TurborepoProject.name)

  return new TurborepoProject({
    name,
    outdir: path.join(tmpdir(), name),
    defaultReleaseBranch: 'master',
    turbo: {
      pipeline: {},
    },
    ...options,
    clobber: false,
  })
}

export function createSubProject(options: Partial<typescript.TypeScriptProjectOptions> = {}) {
  const name = createProjectName('sub')

  return new typescript.TypeScriptProject({
    name,
    defaultReleaseBranch: 'master',
    projenrcTs: true,
    packageManager: javascript.NodePackageManager.NPM,
    ...options,
  })
}

export function synthProjectSnapshot(project: Project) {
  return Testing.synth(project)
}

export function parseYaml(yamlString: string): Record<string, any> {
  return yaml.parse(yamlString)
}