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


  it('should add itself as a development dependency', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].devDependencies).toHaveProperty('projen-turborepo')
  })

  it('should set root package as private', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].private).toBe(true)
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
          outputs: ['build/**', 'dist/**', 'lib/**', 'storybook-static/**'],
        },
        compile: {
          dependsOn: ['^compile'],
          outputs: ['build/**', 'dist/**', 'lib/**', 'storybook-static/**'],
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

  it('should set turborepo baseBranch', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].turbo.baseBranch).toBe('origin/master')
  })

  it('should not include sample code', () => {
    expect.assertions(2)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['src/index.ts']).toBeUndefined()
    expect(synth['test/hello.test.ts']).toBeUndefined()
  })

  it('should not run compile in the root project', () => {
    expect.assertions(1)

    const project = createProject()
    const synth = synthProjectSnapshot(project)

    expect(synth['.projen/tasks.json'].compile).toBeUndefined()
  })
})
