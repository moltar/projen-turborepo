import { synthProjectSnapshot, createSubProject, createProject } from './util'

describe('TurborepoProject', () => {
  it('should add workspaces', () => {
    expect.assertions(1)

    const project = createProject()

    const subProjectDir = 'packages/baz'

    createSubProject({
      parent: project,
      outdir: subProjectDir,
    })

    const synth = synthProjectSnapshot(project)

    expect(synth['package.json'].workspaces).toStrictEqual([subProjectDir])
  })

  it('should add TypeScript path mappings when turned on', () => {
    expect.assertions(4)

    const project = createProject({
      pathMapping: true,
    })

    const subProjectDir = 'packages/baz'
    const subProject = createSubProject({
      parent: project,
      outdir: subProjectDir,
    })

    const synth = synthProjectSnapshot(project)

    expect(synth['tsconfig.json'].compilerOptions.baseUrl).toBe('.')
    expect(synth['tsconfig.json'].compilerOptions.paths).toStrictEqual({ [subProject.package.packageName]: ['packages/baz/src'] })
    expect(synth['tsconfig.dev.json'].compilerOptions.baseUrl).toBe('.')
    expect(synth['tsconfig.dev.json'].compilerOptions.paths).toStrictEqual({ [subProject.package.packageName]: ['packages/baz/src'] })
  })

  it('should not add TypeScript path mappings when turned off', () => {
    expect.assertions(2)

    const project = createProject({
      pathMapping: false,
    })

    const subProjectDir = 'packages/baz'
    createSubProject({
      parent: project,
      outdir: subProjectDir,
    })

    const synth = synthProjectSnapshot(project)

    expect(synth['tsconfig.json'].compilerOptions.baseUrl).toBeUndefined()
    expect(synth['tsconfig.json'].compilerOptions.paths).toBeUndefined()
  })
})