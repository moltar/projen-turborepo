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

  it('should add VS Code settings for ESLint', () => {
    expect.assertions(1)

    const project = createProject()

    const subProjectDir = 'packages/baz'
    createSubProject({
      parent: project,
      outdir: subProjectDir,
    })

    const synth = synthProjectSnapshot(project)

    expect(synth['.vscode/settings.json'].eslint).toBeDefined()
  })


  it('should set composite flag on the tsconfig', () => {
    expect.assertions(1)

    const project = createProject({ projectReferences: true })
    const synth = synthProjectSnapshot(project)

    expect(synth['tsconfig.json'].compilerOptions.composite).toBe(true)
  })

  it('should add TypeScript project references when turned on', () => {
    expect.assertions(1)

    const project = createProject({
      projectReferences: true,
    })

    const subProjectBarDir = 'packages/bar'
    const subProjectBar = createSubProject({
      parent: project,
      outdir: subProjectBarDir,
    })

    const subProjectBazDir = 'packages/baz'
    createSubProject({
      parent: project,
      outdir: subProjectBazDir,
      deps: [subProjectBar.package.packageName],
    })

    const synth = synthProjectSnapshot(project)

    expect(synth['packages/baz/tsconfig.json'].references).toStrictEqual([
      {
        path: '../bar',
      },
    ])
  })
})