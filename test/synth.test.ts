import { javascript } from 'projen'
import { synthProjectSnapshot, createProject } from './util'

describe('TurborepoProject', () => {
  it('should include turbo cache dir in .gitignore', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)
    const gitignore = synth['.gitignore'].split('\n')

    expect(gitignore).toContain('.turbo')
  })

  it('should add turborepo package as a development dependency', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].devDependencies).toHaveProperty('turbo')
  })

  it('should set root package as private', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].private).toBe(true)
  })

  it('should add turbo tasks', () => {
    expect.assertions(2)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].scripts).toHaveProperty('turbo:run')
    expect(synth['package.json'].scripts).toHaveProperty('turbo:prune')
  })

  it('should have turbo config in package.json', () => {
    expect.assertions(1)

    const turbo = {
      baseBranch: 'origin/main',
      pipeline: {
        dev: {
          cache: false,
        },
      },
    }

    const project = createProject({ turbo })
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].turbo).toStrictEqual({
      ...turbo,
      pipeline: {
        ...turbo.pipeline,
        build: {
          dependsOn: ['^build'],
          outputs: ['dist/**', 'lib/**'],
        },
        test: {
          dependsOn: ['^build'],
          outputs: ['coverage/**', 'test-reports/**'],
        },
        eslint: {
          outputs: [],
        },
        watch: {
          cache: false,
        },
      },
    })
  })

  it('should set the npmClient in turbo config', () => {
    expect.assertions(1)

    const project = createProject({
      packageManager: javascript.NodePackageManager.NPM,
    })
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].turbo.npmClient).toBe('npm')
  })
})
