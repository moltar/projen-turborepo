import * as path from 'path'
import { typescript, Project, javascript, JsonFile } from 'projen'

export interface TurborepoPipelineConfig {
  /**
   * The list of tasks that this task depends on.
   *
   * Prefixing a task in `dependsOn` with a `^` tells `turbo` that this pipeline task depends on the
   * package's topological dependencies completing the task with the `^` prefix first (e.g. "a
   * package's `build` tasks should only run once all of its `dependencies` and `devDependencies`
   * have completed their own `build` commands").
   *
   * Items in `dependsOn` without `^` prefix, express the relationships between tasks at the package
   * level (e.g. "a package's `test` and `lint` commands depend on `build` being completed first").
   */
  readonly dependsOn?: string[];

  /**
   * Defaults to `["dist/**", "build/**"]`. The set of glob patterns of a task's cacheable
   * filesystem outputs.
   *
   * Note: `turbo` automatically logs `stderr`/`stdout` to `.turbo/run-<task>.log`. This file is
   * _always_ treated as a cacheable artifact and never needs to be specified.
   *
   * Passing an empty array can be used to tell `turbo` that a task is a side-effect and thus
   * doesn't emit any filesystem artifacts (e.g. like a linter), but you still want to cache its
   * logs (and treat them like an artifact).
   */
  readonly outputs?: string[];

  /**
   * Whether or not to cache the task `outputs`.
   *
   * Setting `cache` to false is useful for daemon or long-running "watch" or development mode tasks
   * that you don't want to cache.
   *
   * @default true
   */
  readonly cache?: boolean;
}

export interface TurborepoConfig {
  /**
   * A list of globs for implicit global hash dependencies. The contents of these files will be
   * included in the global hashing algorithm. This is useful for busting the cache based on `.env`
   * files (not in Git) or any root level file that impacts package tasks (but are not represented
   * in the traditional dependency graph (e.g. a root `tsconfig.json`, `jest.config.js`, `.eslintrc`
   * , etc.)).
   *
   * @see https://turborepo.org/docs/reference/configuration#globaldependencies
   */
  readonly globalDependencies?: string[];


  /**
   * An object representing the task dependency graph of your project. `turbo` interprets these
   * conventions to properly schedule, execute, and cache the outputs of tasks in your project
   *
   * Each key in the `pipeline` object is the name of a task that can be executed by `turbo run`. If
   * `turbo` finds a workspace package with a `package.json` `scripts` object with a matching key,
   * it will apply the pipeline task configuration to that NPM script during execution. This allows
   * you to use `pipeline` to set conventions across your entire Turborepo.
   *
   * @see https://turborepo.org/docs/reference/configuration#pipeline
   */
  readonly pipeline?: Record<string, TurborepoPipelineConfig>;
}

interface TurborepoConfigInternal extends TurborepoConfig{
  /**
   * The base branch or your git repository.
   * Git is used by turbo in its hashing algorithm and `--since` CLI flag.
   *
   * @default 'origin/master'
   *
   * @see https://turborepo.org/docs/reference/configuration#basebranch
   */
  readonly baseBranch: string;

  /**
 * The NPM client in-use in your project.
 *
 * @default yarn
 *
 * @see https://turborepo.org/docs/reference/configuration#npmclient
 */
  readonly npmClient?: string;
}

export interface TurborepoProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * Turborepo config options.
   *
   * @default {}
   */
  readonly turbo?: TurborepoConfig;

  /**
   * Add TypeScript path maps in the root project for sub-projects.
   *
   * @default false
   */
  readonly pathMapping?: boolean;

  /**
   * Adds TypeScript project references for each sub-project that depends on other sub-project.
   *
   * @see https://www.typescriptlang.org/docs/handbook/project-references.html
   *
   * @default false
   */
  readonly projectReferences?: boolean;
}

export class TurborepoProject extends typescript.TypeScriptProject {
  private readonly pathMapping: boolean
  private readonly projectReferences: boolean

  constructor(options: TurborepoProjectOptions) {
    super({
      ...options,
      jest: false,
      sampleCode: false,
    })

    this.pathMapping = options.pathMapping ?? false
    this.projectReferences = options.projectReferences ?? false

    /**
     * Adds itself as a depdency, so that we have it in the consuming project, and
     * can import it inside the projenrc file.
    */
    this.addDevDeps('projen-turborepo')

    /**
     * Add turborepo as a dependency so we have the CLI.
    */
    this.addDevDeps('turbo')

    /**
     * Turborepo cache directory.
    */
    this.gitignore.addPatterns('.turbo')

    /**
     * Finally, turborepo config.
     *
     * @see https://turborepo.org/docs/reference/configuration
     */
    const outputs = ['build', 'dist', 'lib', 'storybook-static'].sort().map((dir) => `${dir}/**`)
    const turbo: TurborepoConfigInternal = {
      npmClient: options.packageManager,

      // TODO: Cannot get the value set in the projenrc file.
      // @see https://github.com/projen/projen/issues/1427
      baseBranch: `origin/${options.defaultReleaseBranch || 'master'}`,

      ...options.turbo,

      pipeline: {
        build: {
          dependsOn: ['^build'],
          outputs,
        },
        compile: {
          dependsOn: ['^compile'],
          outputs,
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
        ...options.turbo?.pipeline,
      },
    }
    this.package.addField('turbo', turbo)

    /**
     * Monorepo root package is always private!
    */
    this.package.addField('private', true)

    /**
     * @see https://www.typescriptlang.org/tsconfig/composite.html
    */
    if (this.projectReferences) {
      for (const tsconfig of [this.tsconfig, this.tsconfigDev]) {
        tsconfig?.file.addOverride('compilerOptions.composite', true)
      }
    }
  }

  private get subProjects(): Project[] {
    // https://github.com/projen/projen/issues/1433
    // @ts-ignore
    const subProjects: Project[] = this.subprojects || []

    return subProjects.sort((a, b) => a.name.localeCompare(b.name))
  }

  preSynthesize() {
    const { subProjects } = this

    const workspaces: string[] = []
    const paths: Record<string, string[]> = {}
    const packageNameSubProjectMap: Record<string, Project> = {}

    for (const subProject of subProjects) {
      const workspace = path.relative(this.outdir, subProject.outdir)
      workspaces.push(workspace)

      if (subProject instanceof javascript.NodeProject) {
        paths[subProject.package.packageName] = [`${workspace}/src`]
        packageNameSubProjectMap[subProject.package.packageName] = subProject
      }
    }

    if (workspaces.length > 0) {
      this.package.addField('workspaces', workspaces)

      // Adds VS Code settings for ESLint to recognize sub-projects
      // https://github.com/Microsoft/vscode-eslint#settings-options
      new JsonFile(this, '.vscode/settings.json', {
        obj: {
          eslint: {
            workingDirectories: workspaces.map((workspace) => `./${workspace}`),
          },
        },
      })
    }

    for (const subProject of subProjects) {
      const packageNames = Object.keys(packageNameSubProjectMap)

      if (subProject instanceof typescript.TypeScriptProject) {
        const depProjects = subProject
          .deps
          .all
          .filter(({ name }) => packageNames.includes(name))
          .map(({ name }) => packageNameSubProjectMap[name])

        const references = depProjects
          .map(({ outdir }) => path.relative(subProject.outdir, outdir))
          .map((p) => ({ path: p }))

        const pathMappings: Record<string, string[]> = {}
        if (this.pathMapping) {
          for (const depProject of depProjects) {
            if (depProject instanceof javascript.NodeProject) {
              pathMappings[depProject.package.packageName] = [
                path.relative(subProject.outdir, depProject.outdir),
              ]
            }
          }
        }

        for (const tsconfig of [subProject.tsconfig, subProject.tsconfigDev]) {
          if (this.pathMapping) {
            tsconfig?.file.addOverride('compilerOptions.baseUrl', '.')

            for (const [packageName, packagePath] of Object.entries(pathMappings)) {
              tsconfig?.file.addOverride(`compilerOptions.paths.${packageName}`, [`${packagePath}/src`])
            }
          }

          if (this.projectReferences && references.length > 0) {
            tsconfig?.file.addOverride('references', references)

            for (const depProject of depProjects) {
              if (depProject instanceof typescript.TypeScriptProject) {
                for (const depTsconfig of [depProject.tsconfig, depProject.tsconfigDev]) {
                  depTsconfig?.file.addOverride('compilerOptions.composite', true)
                }
              }
            }
          }
        }
      }
    }
  }
}