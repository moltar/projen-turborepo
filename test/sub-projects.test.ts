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
      srcdir: 'pages',
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
      [subProjectBar.package.packageName]: ['../bar/pages'],
    })
  })

  it('should add VS Code settings', () => {
    expect.assertions(1)

    const project = createProject({
      name: '@foo/root',
      vscodeMultiRootWorkspaces: true,
    })

    const subProjectDir = 'packages/baz'
    createSubProject({
      name: '@foo/sub',
      parent: project,
      outdir: subProjectDir,
    })

    const synth = synthProjectSnapshot(project)

    expect(JSON.parse(synth['@foo-root.code-workspace'])).toMatchSnapshot()
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
      [`^${subProjectBar.name}$`]: '<rootDir>/../bar/src',
    })
  })

  it('should have no build job in root for when parallelWorkflows are on', () => {
    expect.assertions(1)

    const project = createProject({
      parallelWorkflows: true,
      mutableBuild: false,
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

    expect(synth['.github/workflows/build.yml']).toMatchSnapshot()
  })

  it('should have one build job in root for when parallelWorkflows are off', () => {
    expect.assertions(1)

    const project = createProject({
      parallelWorkflows: false,
      mutableBuild: false,
    })
    const synth = synthProjectSnapshot(project)

    expect(synth['.github/workflows/build.yml']).toMatchSnapshot()
  })

  it('should not clobber basePath', () => {
    const baseUrl = 'src'

    const project = createProject({
      pathMapping: true,
    })

    const subProjectBarDir = 'packages/bar'
    const subProjectBar = createSubProject({
      name: 'bar',
      parent: project,
      outdir: subProjectBarDir,
      srcdir: 'pages',
    })

    const subProjectBazDir = 'packages/baz'
    createSubProject({
      name: 'baz',
      parent: project,
      outdir: subProjectBazDir,
      deps: [subProjectBar.package.packageName],
      tsconfig: {
        compilerOptions: {
          baseUrl,
        },
      },
    })

    const synth = synthProjectSnapshot(project)

    expect(synth['packages/baz/tsconfig.json'].compilerOptions.baseUrl).toBe(baseUrl)
    expect(synth['packages/baz/tsconfig.json'].compilerOptions.paths.bar).toStrictEqual(['../../bar/pages'])
  })
})