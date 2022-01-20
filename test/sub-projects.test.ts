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
    expect.assertions(2)

    const project = createProject({
      pathMapping: true,
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

    expect(synth['packages/baz/tsconfig.json'].compilerOptions.baseUrl).toBe('.')
    expect(synth['packages/baz/tsconfig.json'].compilerOptions.paths).toStrictEqual({
      [subProjectBar.package.packageName]: ['../bar/src'],
    })
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
    expect.assertions(2)

    const project = createProject({ projectReferences: true })

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

    expect(synth['tsconfig.json'].compilerOptions.composite).toBe(true)
    expect(synth['packages/bar/tsconfig.json'].compilerOptions.composite).toBe(true)
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

  it('should add moduleNameMapper for jest', () => {
    expect.assertions(1)

    const project = createProject({
      jestModuleNameMapper: true,
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

    expect(synth['packages/baz/package.json'].jest.moduleNameMapper).toStrictEqual({
      [`^${subProjectBar.name.replace('-', '\\-')}$`]: '<rootDir>/../bar/src',
    })
  })

  describe('for each sub-project', () => {
    const project = createProject({
      parallelWorkflows: true,
    })

    const subProjectBarDir = 'packages/bar'
    const subProjectBar = createSubProject({
      name: 'bar',
      parent: project,
      outdir: subProjectBarDir,
    })

    const subProjectBazDir = 'packages/baz'
    createSubProject({
      name: 'baz',
      parent: project,
      outdir: subProjectBazDir,
      deps: [subProjectBar.package.packageName],
    })

    const synth = synthProjectSnapshot(project)
    const githubWorkflowFiles = Object.keys(synth).filter((file) => file.startsWith('.github/workflows/'))

    it.each(githubWorkflowFiles)('%s should have a GitHub actions workflow', (githubWorkflowFile) => {
      expect.assertions(1)

      expect(synth[githubWorkflowFile]).toMatchSnapshot()
    })
  })
})