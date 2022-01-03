# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="structs"></a>

### TurborepoConfig <a name="projen-turborepo.TurborepoConfig" id="projenturborepoturborepoconfig"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { TurborepoConfig } from 'projen-turborepo'

const turborepoConfig: TurborepoConfig = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`globalDependencies`](#projenturborepoturborepoconfigpropertyglobaldependencies) | `string`[] | A list of globs for implicit global hash dependencies. |
| [`pipeline`](#projenturborepoturborepoconfigpropertypipeline) | {[ key: string ]: [`projen-turborepo.TurborepoPipelineConfig`](#projen-turborepo.TurborepoPipelineConfig)} | An object representing the task dependency graph of your project. |

---

##### `globalDependencies`<sup>Optional</sup> <a name="projen-turborepo.TurborepoConfig.property.globalDependencies" id="projenturborepoturborepoconfigpropertyglobaldependencies"></a>

```typescript
public readonly globalDependencies: string[];
```

- *Type:* `string`[]

A list of globs for implicit global hash dependencies.

The contents of these files will be included in the global hashing algorithm. This is useful for busting the cache based on `.env` files (not in Git) or any root level file that impacts package tasks (but are not represented in the traditional dependency graph (e.g. a root `tsconfig.json`, `jest.config.js`, `.eslintrc` , etc.)).

> https://turborepo.org/docs/reference/configuration#globaldependencies

---

##### `pipeline`<sup>Optional</sup> <a name="projen-turborepo.TurborepoConfig.property.pipeline" id="projenturborepoturborepoconfigpropertypipeline"></a>

```typescript
public readonly pipeline: {[ key: string ]: TurborepoPipelineConfig};
```

- *Type:* {[ key: string ]: [`projen-turborepo.TurborepoPipelineConfig`](#projen-turborepo.TurborepoPipelineConfig)}

An object representing the task dependency graph of your project.

`turbo` interprets these conventions to properly schedule, execute, and cache the outputs of tasks in your project  Each key in the `pipeline` object is the name of a task that can be executed by `turbo run`. If `turbo` finds a workspace package with a `package.json` `scripts` object with a matching key, it will apply the pipeline task configuration to that NPM script during execution. This allows you to use `pipeline` to set conventions across your entire Turborepo.

> https://turborepo.org/docs/reference/configuration#pipeline

---

### TurborepoPipelineConfig <a name="projen-turborepo.TurborepoPipelineConfig" id="projenturborepoturborepopipelineconfig"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { TurborepoPipelineConfig } from 'projen-turborepo'

const turborepoPipelineConfig: TurborepoPipelineConfig = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`cache`](#projenturborepoturborepopipelineconfigpropertycache) | `boolean` | Whether or not to cache the task `outputs`. |
| [`dependsOn`](#projenturborepoturborepopipelineconfigpropertydependson) | `string`[] | The list of tasks that this task depends on. |
| [`outputs`](#projenturborepoturborepopipelineconfigpropertyoutputs) | `string`[] | Defaults to `["dist/**", "build/**"]`. The set of glob patterns of a task's cacheable filesystem outputs. |

---

##### `cache`<sup>Optional</sup> <a name="projen-turborepo.TurborepoPipelineConfig.property.cache" id="projenturborepoturborepopipelineconfigpropertycache"></a>

```typescript
public readonly cache: boolean;
```

- *Type:* `boolean`
- *Default:* true

Whether or not to cache the task `outputs`.

Setting `cache` to false is useful for daemon or long-running "watch" or development mode tasks that you don't want to cache.

---

##### `dependsOn`<sup>Optional</sup> <a name="projen-turborepo.TurborepoPipelineConfig.property.dependsOn" id="projenturborepoturborepopipelineconfigpropertydependson"></a>

```typescript
public readonly dependsOn: string[];
```

- *Type:* `string`[]

The list of tasks that this task depends on.

Prefixing a task in `dependsOn` with a `^` tells `turbo` that this pipeline task depends on the package's topological dependencies completing the task with the `^` prefix first (e.g. "a package's `build` tasks should only run once all of its `dependencies` and `devDependencies` have completed their own `build` commands").  Items in `dependsOn` without `^` prefix, express the relationships between tasks at the package level (e.g. "a package's `test` and `lint` commands depend on `build` being completed first").

---

##### `outputs`<sup>Optional</sup> <a name="projen-turborepo.TurborepoPipelineConfig.property.outputs" id="projenturborepoturborepopipelineconfigpropertyoutputs"></a>

```typescript
public readonly outputs: string[];
```

- *Type:* `string`[]

Defaults to `["dist/**", "build/**"]`. The set of glob patterns of a task's cacheable filesystem outputs.

Note: `turbo` automatically logs `stderr`/`stdout` to `.turbo/run-<task>.log`. This file is _always_ treated as a cacheable artifact and never needs to be specified.  Passing an empty array can be used to tell `turbo` that a task is a side-effect and thus doesn't emit any filesystem artifacts (e.g. like a linter), but you still want to cache its logs (and treat them like an artifact).

---

### TurborepoProjectOptions <a name="projen-turborepo.TurborepoProjectOptions" id="projenturborepoturborepoprojectoptions"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { TurborepoProjectOptions } from 'projen-turborepo'

const turborepoProjectOptions: TurborepoProjectOptions = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`name`](#projenturborepoturborepoprojectoptionspropertyname)<span title="Required">*</span> | `string` | This is the name of your project. |
| [`logging`](#projenturborepoturborepoprojectoptionspropertylogging) | [`projen.LoggerOptions`](#projen.LoggerOptions) | Configure logging options such as verbosity. |
| [`outdir`](#projenturborepoturborepoprojectoptionspropertyoutdir) | `string` | The root directory of the project. |
| [`parent`](#projenturborepoturborepoprojectoptionspropertyparent) | [`projen.Project`](#projen.Project) | The parent project, if this project is part of a bigger project. |
| [`projenCommand`](#projenturborepoturborepoprojectoptionspropertyprojencommand) | `string` | The shell command to use in order to run the projen CLI. |
| [`projenrcJson`](#projenturborepoturborepoprojectoptionspropertyprojenrcjson) | `boolean` | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| [`projenrcJsonOptions`](#projenturborepoturborepoprojectoptionspropertyprojenrcjsonoptions) | [`projen.ProjenrcOptions`](#projen.ProjenrcOptions) | Options for .projenrc.json. |
| [`autoApproveOptions`](#projenturborepoturborepoprojectoptionspropertyautoapproveoptions) | [`projen.github.AutoApproveOptions`](#projen.github.AutoApproveOptions) | Enable and configure the 'auto approve' workflow. |
| [`autoMergeOptions`](#projenturborepoturborepoprojectoptionspropertyautomergeoptions) | [`projen.github.AutoMergeOptions`](#projen.github.AutoMergeOptions) | Configure options for automatic merging on GitHub. |
| [`clobber`](#projenturborepoturborepoprojectoptionspropertyclobber) | `boolean` | Add a `clobber` task which resets the repo to origin. |
| [`devContainer`](#projenturborepoturborepoprojectoptionspropertydevcontainer) | `boolean` | Add a VSCode development environment (used for GitHub Codespaces). |
| [`github`](#projenturborepoturborepoprojectoptionspropertygithub) | `boolean` | Enable GitHub integration. |
| [`githubOptions`](#projenturborepoturborepoprojectoptionspropertygithuboptions) | [`projen.github.GitHubOptions`](#projen.github.GitHubOptions) | Options for GitHub integration. |
| [`gitpod`](#projenturborepoturborepoprojectoptionspropertygitpod) | `boolean` | Add a Gitpod development environment. |
| [`mergify`](#projenturborepoturborepoprojectoptionspropertymergify) | `boolean` | Whether mergify should be enabled on this repository or not. |
| [`mergifyOptions`](#projenturborepoturborepoprojectoptionspropertymergifyoptions) | [`projen.github.MergifyOptions`](#projen.github.MergifyOptions) | Options for mergify. |
| [`projectType`](#projenturborepoturborepoprojectoptionspropertyprojecttype) | [`projen.ProjectType`](#projen.ProjectType) | Which type of project this is (library/app). |
| [`projenTokenSecret`](#projenturborepoturborepoprojectoptionspropertyprojentokensecret) | `string` | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| [`readme`](#projenturborepoturborepoprojectoptionspropertyreadme) | [`projen.SampleReadmeProps`](#projen.SampleReadmeProps) | The README setup. |
| [`stale`](#projenturborepoturborepoprojectoptionspropertystale) | `boolean` | Auto-close of stale issues and pull request. |
| [`staleOptions`](#projenturborepoturborepoprojectoptionspropertystaleoptions) | [`projen.github.StaleOptions`](#projen.github.StaleOptions) | Auto-close stale issues and pull requests. |
| [`vscode`](#projenturborepoturborepoprojectoptionspropertyvscode) | `boolean` | Enable VSCode integration. |
| [`allowLibraryDependencies`](#projenturborepoturborepoprojectoptionspropertyallowlibrarydependencies) | `boolean` | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| [`authorEmail`](#projenturborepoturborepoprojectoptionspropertyauthoremail) | `string` | Author's e-mail. |
| [`authorName`](#projenturborepoturborepoprojectoptionspropertyauthorname) | `string` | Author's name. |
| [`authorOrganization`](#projenturborepoturborepoprojectoptionspropertyauthororganization) | `boolean` | Author's Organization. |
| [`authorUrl`](#projenturborepoturborepoprojectoptionspropertyauthorurl) | `string` | Author's URL / Website. |
| [`autoDetectBin`](#projenturborepoturborepoprojectoptionspropertyautodetectbin) | `boolean` | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| [`bin`](#projenturborepoturborepoprojectoptionspropertybin) | {[ key: string ]: `string`} | Binary programs vended with your module. |
| [`bugsEmail`](#projenturborepoturborepoprojectoptionspropertybugsemail) | `string` | The email address to which issues should be reported. |
| [`bugsUrl`](#projenturborepoturborepoprojectoptionspropertybugsurl) | `string` | The url to your project's issue tracker. |
| [`bundledDeps`](#projenturborepoturborepoprojectoptionspropertybundleddeps) | `string`[] | List of dependencies to bundle into this module. |
| [`codeArtifactOptions`](#projenturborepoturborepoprojectoptionspropertycodeartifactoptions) | [`projen.javascript.CodeArtifactOptions`](#projen.javascript.CodeArtifactOptions) | Options for publishing npm package to AWS CodeArtifact. |
| [`deps`](#projenturborepoturborepoprojectoptionspropertydeps) | `string`[] | Runtime dependencies of this module. |
| [`description`](#projenturborepoturborepoprojectoptionspropertydescription) | `string` | The description is just a string that helps people understand the purpose of the package. |
| [`devDeps`](#projenturborepoturborepoprojectoptionspropertydevdeps) | `string`[] | Build dependencies for this module. |
| [`entrypoint`](#projenturborepoturborepoprojectoptionspropertyentrypoint) | `string` | Module entrypoint (`main` in `package.json`). |
| [`homepage`](#projenturborepoturborepoprojectoptionspropertyhomepage) | `string` | Package's Homepage / Website. |
| [`keywords`](#projenturborepoturborepoprojectoptionspropertykeywords) | `string`[] | Keywords to include in `package.json`. |
| [`license`](#projenturborepoturborepoprojectoptionspropertylicense) | `string` | License's SPDX identifier. |
| [`licensed`](#projenturborepoturborepoprojectoptionspropertylicensed) | `boolean` | Indicates if a license should be added. |
| [`maxNodeVersion`](#projenturborepoturborepoprojectoptionspropertymaxnodeversion) | `string` | Minimum node.js version to require via `engines` (inclusive). |
| [`minNodeVersion`](#projenturborepoturborepoprojectoptionspropertyminnodeversion) | `string` | Minimum Node.js version to require via package.json `engines` (inclusive). |
| [`npmAccess`](#projenturborepoturborepoprojectoptionspropertynpmaccess) | [`projen.javascript.NpmAccess`](#projen.javascript.NpmAccess) | Access level of the npm package. |
| [`npmRegistry`](#projenturborepoturborepoprojectoptionspropertynpmregistry) | `string` | The host name of the npm registry to publish to. |
| [`npmRegistryUrl`](#projenturborepoturborepoprojectoptionspropertynpmregistryurl) | `string` | The base URL of the npm package registry. |
| [`npmTokenSecret`](#projenturborepoturborepoprojectoptionspropertynpmtokensecret) | `string` | GitHub secret which contains the NPM token to use when publishing packages. |
| [`packageManager`](#projenturborepoturborepoprojectoptionspropertypackagemanager) | [`projen.javascript.NodePackageManager`](#projen.javascript.NodePackageManager) | The Node Package Manager used to execute scripts. |
| [`packageName`](#projenturborepoturborepoprojectoptionspropertypackagename) | `string` | The "name" in package.json. |
| [`peerDependencyOptions`](#projenturborepoturborepoprojectoptionspropertypeerdependencyoptions) | [`projen.javascript.PeerDependencyOptions`](#projen.javascript.PeerDependencyOptions) | Options for `peerDeps`. |
| [`peerDeps`](#projenturborepoturborepoprojectoptionspropertypeerdeps) | `string`[] | Peer dependencies for this module. |
| [`repository`](#projenturborepoturborepoprojectoptionspropertyrepository) | `string` | The repository is the location where the actual code for your package lives. |
| [`repositoryDirectory`](#projenturborepoturborepoprojectoptionspropertyrepositorydirectory) | `string` | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| [`scripts`](#projenturborepoturborepoprojectoptionspropertyscripts) | {[ key: string ]: `string`} | npm scripts to include. |
| [`stability`](#projenturborepoturborepoprojectoptionspropertystability) | `string` | Package's Stability. |
| [`jsiiReleaseVersion`](#projenturborepoturborepoprojectoptionspropertyjsiireleaseversion) | `string` | Version requirement of `jsii-release` which is used to publish modules to npm. |
| [`majorVersion`](#projenturborepoturborepoprojectoptionspropertymajorversion) | `number` | Major version to release from the default branch. |
| [`npmDistTag`](#projenturborepoturborepoprojectoptionspropertynpmdisttag) | `string` | The npmDistTag to use when publishing from the default branch. |
| [`postBuildSteps`](#projenturborepoturborepoprojectoptionspropertypostbuildsteps) | [`projen.github.workflows.JobStep`](#projen.github.workflows.JobStep)[] | Steps to execute after build as part of the release workflow. |
| [`prerelease`](#projenturborepoturborepoprojectoptionspropertyprerelease) | `string` | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| [`publishDryRun`](#projenturborepoturborepoprojectoptionspropertypublishdryrun) | `boolean` | Instead of actually publishing to package managers, just print the publishing command. |
| [`publishTasks`](#projenturborepoturborepoprojectoptionspropertypublishtasks) | `boolean` | Define publishing tasks that can be executed manually as well as workflows. |
| [`releaseBranches`](#projenturborepoturborepoprojectoptionspropertyreleasebranches) | {[ key: string ]: [`projen.release.BranchOptions`](#projen.release.BranchOptions)} | Defines additional release branches. |
| [`releaseEveryCommit`](#projenturborepoturborepoprojectoptionspropertyreleaseeverycommit) | `boolean` | Automatically release new versions every commit to one of branches in `releaseBranches`. |
| [`releaseFailureIssue`](#projenturborepoturborepoprojectoptionspropertyreleasefailureissue) | `boolean` | Create a github issue on every failed publishing task. |
| [`releaseFailureIssueLabel`](#projenturborepoturborepoprojectoptionspropertyreleasefailureissuelabel) | `string` | The label to apply to issues indicating publish failures. |
| [`releaseSchedule`](#projenturborepoturborepoprojectoptionspropertyreleaseschedule) | `string` | CRON schedule to trigger new releases. |
| [`releaseTagPrefix`](#projenturborepoturborepoprojectoptionspropertyreleasetagprefix) | `string` | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| [`releaseTrigger`](#projenturborepoturborepoprojectoptionspropertyreleasetrigger) | [`projen.release.ReleaseTrigger`](#projen.release.ReleaseTrigger) | The release trigger to use. |
| [`releaseWorkflowName`](#projenturborepoturborepoprojectoptionspropertyreleaseworkflowname) | `string` | The name of the default release workflow. |
| [`releaseWorkflowSetupSteps`](#projenturborepoturborepoprojectoptionspropertyreleaseworkflowsetupsteps) | [`projen.github.workflows.JobStep`](#projen.github.workflows.JobStep)[] | A set of workflow steps to execute in order to setup the workflow container. |
| [`versionrcOptions`](#projenturborepoturborepoprojectoptionspropertyversionrcoptions) | {[ key: string ]: `any`} | Custom configuration used when creating changelog with standard-version package. |
| [`workflowContainerImage`](#projenturborepoturborepoprojectoptionspropertyworkflowcontainerimage) | `string` | Container image to use for GitHub workflows. |
| [`workflowRunsOn`](#projenturborepoturborepoprojectoptionspropertyworkflowrunson) | `string`[] | Github Runner selection labels. |
| [`defaultReleaseBranch`](#projenturborepoturborepoprojectoptionspropertydefaultreleasebranch)<span title="Required">*</span> | `string` | The name of the main release branch. |
| [`artifactsDirectory`](#projenturborepoturborepoprojectoptionspropertyartifactsdirectory) | `string` | A directory which will contain build artifacts. |
| [`autoApproveProjenUpgrades`](#projenturborepoturborepoprojectoptionspropertyautoapproveprojenupgrades) | `boolean` | Automatically approve projen upgrade PRs, allowing them to be merged by mergify (if configued). |
| [`autoApproveUpgrades`](#projenturborepoturborepoprojectoptionspropertyautoapproveupgrades) | `boolean` | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configued). |
| [`buildWorkflow`](#projenturborepoturborepoprojectoptionspropertybuildworkflow) | `boolean` | Define a GitHub workflow for building PRs. |
| [`bundlerOptions`](#projenturborepoturborepoprojectoptionspropertybundleroptions) | [`projen.javascript.BundlerOptions`](#projen.javascript.BundlerOptions) | Options for `Bundler`. |
| [`codeCov`](#projenturborepoturborepoprojectoptionspropertycodecov) | `boolean` | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret. |
| [`codeCovTokenSecret`](#projenturborepoturborepoprojectoptionspropertycodecovtokensecret) | `string` | Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories. |
| [`copyrightOwner`](#projenturborepoturborepoprojectoptionspropertycopyrightowner) | `string` | License copyright owner. |
| [`copyrightPeriod`](#projenturborepoturborepoprojectoptionspropertycopyrightperiod) | `string` | The copyright years to put in the LICENSE file. |
| [`dependabot`](#projenturborepoturborepoprojectoptionspropertydependabot) | `boolean` | Use dependabot to handle dependency upgrades. |
| [`dependabotOptions`](#projenturborepoturborepoprojectoptionspropertydependabotoptions) | [`projen.github.DependabotOptions`](#projen.github.DependabotOptions) | Options for dependabot. |
| [`depsUpgrade`](#projenturborepoturborepoprojectoptionspropertydepsupgrade) | `boolean` | Use github workflows to handle dependency upgrades. |
| [`depsUpgradeOptions`](#projenturborepoturborepoprojectoptionspropertydepsupgradeoptions) | [`projen.javascript.UpgradeDependenciesOptions`](#projen.javascript.UpgradeDependenciesOptions) | Options for depsUpgrade. |
| [`gitignore`](#projenturborepoturborepoprojectoptionspropertygitignore) | `string`[] | Additional entries to .gitignore. |
| [`jest`](#projenturborepoturborepoprojectoptionspropertyjest) | `boolean` | Setup jest unit tests. |
| [`jestOptions`](#projenturborepoturborepoprojectoptionspropertyjestoptions) | [`projen.javascript.JestOptions`](#projen.javascript.JestOptions) | Jest options. |
| [`mutableBuild`](#projenturborepoturborepoprojectoptionspropertymutablebuild) | `boolean` | Automatically update files modified during builds to pull-request branches. |
| [`npmignore`](#projenturborepoturborepoprojectoptionspropertynpmignore) | `string`[] | Additional entries to .npmignore. |
| [`npmignoreEnabled`](#projenturborepoturborepoprojectoptionspropertynpmignoreenabled) | `boolean` | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| [`package`](#projenturborepoturborepoprojectoptionspropertypackage) | `boolean` | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| [`prettier`](#projenturborepoturborepoprojectoptionspropertyprettier) | `boolean` | Setup prettier. |
| [`prettierOptions`](#projenturborepoturborepoprojectoptionspropertyprettieroptions) | [`projen.javascript.PrettierOptions`](#projen.javascript.PrettierOptions) | Prettier options. |
| [`projenDevDependency`](#projenturborepoturborepoprojectoptionspropertyprojendevdependency) | `boolean` | Indicates of "projen" should be installed as a devDependency. |
| [`projenrcJs`](#projenturborepoturborepoprojectoptionspropertyprojenrcjs) | `boolean` | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| [`projenrcJsOptions`](#projenturborepoturborepoprojectoptionspropertyprojenrcjsoptions) | [`projen.javascript.ProjenrcOptions`](#projen.javascript.ProjenrcOptions) | Options for .projenrc.js. |
| [`projenUpgradeAutoMerge`](#projenturborepoturborepoprojectoptionspropertyprojenupgradeautomerge) | `boolean` | Automatically approve projen upgrade PRs, allowing them to be merged by mergify (if configued). |
| [`projenUpgradeSchedule`](#projenturborepoturborepoprojectoptionspropertyprojenupgradeschedule) | `string`[] | Customize the projenUpgrade schedule in cron expression. |
| [`projenUpgradeSecret`](#projenturborepoturborepoprojectoptionspropertyprojenupgradesecret) | `string` | Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`). |
| [`projenVersion`](#projenturborepoturborepoprojectoptionspropertyprojenversion) | `string` | Version of projen to install. |
| [`pullRequestTemplate`](#projenturborepoturborepoprojectoptionspropertypullrequesttemplate) | `boolean` | Include a GitHub pull request template. |
| [`pullRequestTemplateContents`](#projenturborepoturborepoprojectoptionspropertypullrequesttemplatecontents) | `string`[] | The contents of the pull request template. |
| [`release`](#projenturborepoturborepoprojectoptionspropertyrelease) | `boolean` | Add release management to this project. |
| [`releaseToNpm`](#projenturborepoturborepoprojectoptionspropertyreleasetonpm) | `boolean` | Automatically release to npm when new versions are introduced. |
| [`releaseWorkflow`](#projenturborepoturborepoprojectoptionspropertyreleaseworkflow) | `boolean` | DEPRECATED: renamed to `release`. |
| [`workflowBootstrapSteps`](#projenturborepoturborepoprojectoptionspropertyworkflowbootstrapsteps) | `any`[] | Workflow steps to use in order to bootstrap this repo. |
| [`workflowGitIdentity`](#projenturborepoturborepoprojectoptionspropertyworkflowgitidentity) | [`projen.github.GitIdentity`](#projen.github.GitIdentity) | The git identity to use in workflows. |
| [`workflowNodeVersion`](#projenturborepoturborepoprojectoptionspropertyworkflownodeversion) | `string` | The node version to use in GitHub workflows. |
| [`disableTsconfig`](#projenturborepoturborepoprojectoptionspropertydisabletsconfig) | `boolean` | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). |
| [`docgen`](#projenturborepoturborepoprojectoptionspropertydocgen) | `boolean` | Docgen by Typedoc. |
| [`docsDirectory`](#projenturborepoturborepoprojectoptionspropertydocsdirectory) | `string` | Docs directory. |
| [`entrypointTypes`](#projenturborepoturborepoprojectoptionspropertyentrypointtypes) | `string` | The .d.ts file that includes the type declarations for this module. |
| [`eslint`](#projenturborepoturborepoprojectoptionspropertyeslint) | `boolean` | Setup eslint. |
| [`eslintOptions`](#projenturborepoturborepoprojectoptionspropertyeslintoptions) | [`projen.javascript.EslintOptions`](#projen.javascript.EslintOptions) | Eslint options. |
| [`libdir`](#projenturborepoturborepoprojectoptionspropertylibdir) | `string` | Typescript  artifacts output directory. |
| [`projenrcTs`](#projenturborepoturborepoprojectoptionspropertyprojenrcts) | `boolean` | Use TypeScript for your projenrc file (`.projenrc.ts`). |
| [`projenrcTsOptions`](#projenturborepoturborepoprojectoptionspropertyprojenrctsoptions) | [`projen.typescript.ProjenrcOptions`](#projen.typescript.ProjenrcOptions) | Options for .projenrc.ts. |
| [`sampleCode`](#projenturborepoturborepoprojectoptionspropertysamplecode) | `boolean` | Generate one-time sample in `src/` and `test/` if there are no files there. |
| [`srcdir`](#projenturborepoturborepoprojectoptionspropertysrcdir) | `string` | Typescript sources directory. |
| [`testdir`](#projenturborepoturborepoprojectoptionspropertytestdir) | `string` | Jest tests directory. Tests files should be named `xxx.test.ts`. |
| [`tsconfig`](#projenturborepoturborepoprojectoptionspropertytsconfig) | [`projen.javascript.TypescriptConfigOptions`](#projen.javascript.TypescriptConfigOptions) | Custom TSConfig. |
| [`tsconfigDev`](#projenturborepoturborepoprojectoptionspropertytsconfigdev) | [`projen.javascript.TypescriptConfigOptions`](#projen.javascript.TypescriptConfigOptions) | Custom tsconfig options for the development tsconfig.json file (used for testing). |
| [`tsconfigDevFile`](#projenturborepoturborepoprojectoptionspropertytsconfigdevfile) | `string` | The name of the development tsconfig.json file. |
| [`typescriptVersion`](#projenturborepoturborepoprojectoptionspropertytypescriptversion) | `string` | TypeScript version to use. |
| [`pathMapping`](#projenturborepoturborepoprojectoptionspropertypathmapping) | `boolean` | Add TypeScript path maps in the root project for sub-projects. |
| [`turbo`](#projenturborepoturborepoprojectoptionspropertyturbo) | [`projen-turborepo.TurborepoConfig`](#projen-turborepo.TurborepoConfig) | Turborepo config options. |

---

##### `name`<sup>Required</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.name" id="projenturborepoturborepoprojectoptionspropertyname"></a>

```typescript
public readonly name: string;
```

- *Type:* `string`
- *Default:* $BASEDIR

This is the name of your project.

---

##### `logging`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.logging" id="projenturborepoturborepoprojectoptionspropertylogging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* [`projen.LoggerOptions`](#projen.LoggerOptions)
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.outdir" id="projenturborepoturborepoprojectoptionspropertyoutdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* `string`
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.  If this project has a parent, this directory is relative to the parent directory and it cannot be the same as the parent or any of it's other sub-projects.

---

##### `parent`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.parent" id="projenturborepoturborepoprojectoptionspropertyparent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* [`projen.Project`](#projen.Project)

The parent project, if this project is part of a bigger project.

---

##### `projenCommand`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenCommand" id="projenturborepoturborepoprojectoptionspropertyprojencommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* `string`
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenrcJson" id="projenturborepoturborepoprojectoptionspropertyprojenrcjson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* `boolean`
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenrcJsonOptions" id="projenturborepoturborepoprojectoptionspropertyprojenrcjsonoptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcOptions;
```

- *Type:* [`projen.ProjenrcOptions`](#projen.ProjenrcOptions)
- *Default:* default options

Options for .projenrc.json.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.autoApproveOptions" id="projenturborepoturborepoprojectoptionspropertyautoapproveoptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* [`projen.github.AutoApproveOptions`](#projen.github.AutoApproveOptions)
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.autoMergeOptions" id="projenturborepoturborepoprojectoptionspropertyautomergeoptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* [`projen.github.AutoMergeOptions`](#projen.github.AutoMergeOptions)
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if `github.mergify` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.clobber" id="projenturborepoturborepoprojectoptionspropertyclobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* `boolean`
- *Default:* true

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.devContainer" id="projenturborepoturborepoprojectoptionspropertydevcontainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* `boolean`
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.github" id="projenturborepoturborepoprojectoptionspropertygithub"></a>

```typescript
public readonly github: boolean;
```

- *Type:* `boolean`
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.githubOptions" id="projenturborepoturborepoprojectoptionspropertygithuboptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* [`projen.github.GitHubOptions`](#projen.github.GitHubOptions)
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.gitpod" id="projenturborepoturborepoprojectoptionspropertygitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* `boolean`
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.mergify" id="projenturborepoturborepoprojectoptionspropertymergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* `boolean`
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.mergifyOptions" id="projenturborepoturborepoprojectoptionspropertymergifyoptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* [`projen.github.MergifyOptions`](#projen.github.MergifyOptions)
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projectType" id="projenturborepoturborepoprojectoptionspropertyprojecttype"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* [`projen.ProjectType`](#projen.ProjectType)
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenTokenSecret`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenTokenSecret" id="projenturborepoturborepoprojectoptionspropertyprojentokensecret"></a>

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* `string`
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows` and `packages` scope.

---

##### `readme`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.readme" id="projenturborepoturborepoprojectoptionspropertyreadme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* [`projen.SampleReadmeProps`](#projen.SampleReadmeProps)
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

##### `stale`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.stale" id="projenturborepoturborepoprojectoptionspropertystale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* `boolean`
- *Default:* true

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.staleOptions" id="projenturborepoturborepoprojectoptionspropertystaleoptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* [`projen.github.StaleOptions`](#projen.github.StaleOptions)
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.vscode" id="projenturborepoturborepoprojectoptionspropertyvscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* `boolean`
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `allowLibraryDependencies`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.allowLibraryDependencies" id="projenturborepoturborepoprojectoptionspropertyallowlibrarydependencies"></a>

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* `boolean`
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning for specifying these.

---

##### `authorEmail`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.authorEmail" id="projenturborepoturborepoprojectoptionspropertyauthoremail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* `string`

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.authorName" id="projenturborepoturborepoprojectoptionspropertyauthorname"></a>

```typescript
public readonly authorName: string;
```

- *Type:* `string`

Author's name.

---

##### `authorOrganization`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.authorOrganization" id="projenturborepoturborepoprojectoptionspropertyauthororganization"></a>

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* `boolean`

Author's Organization.

---

##### `authorUrl`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.authorUrl" id="projenturborepoturborepoprojectoptionspropertyauthorurl"></a>

```typescript
public readonly authorUrl: string;
```

- *Type:* `string`

Author's URL / Website.

---

##### `autoDetectBin`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.autoDetectBin" id="projenturborepoturborepoprojectoptionspropertyautodetectbin"></a>

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* `boolean`
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### `bin`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.bin" id="projenturborepoturborepoprojectoptionspropertybin"></a>

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in your `package.json`, but unless `autoDetectBin` is `false`, every executable file under `bin` will automatically be added to this section.

---

##### `bugsEmail`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.bugsEmail" id="projenturborepoturborepoprojectoptionspropertybugsemail"></a>

```typescript
public readonly bugsEmail: string;
```

- *Type:* `string`

The email address to which issues should be reported.

---

##### `bugsUrl`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.bugsUrl" id="projenturborepoturborepoprojectoptionspropertybugsurl"></a>

```typescript
public readonly bugsUrl: string;
```

- *Type:* `string`

The url to your project's issue tracker.

---

##### `bundledDeps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.bundledDeps" id="projenturborepoturborepoprojectoptionspropertybundleddeps"></a>

```typescript
public readonly bundledDeps: string[];
```

- *Type:* `string`[]

List of dependencies to bundle into this module.

These modules will be added both to the `dependencies` section and `bundledDependencies` section of your `package.json`.  The recommendation is to only specify the module name here (e.g. `express`). This will behave similar to `yarn add` or `npm install` in the sense that it will add the module as a dependency to your `package.json` file with the latest version (`^`). You can specify semver requirements in the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and this will be what you `package.json` will eventually include.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.codeArtifactOptions" id="projenturborepoturborepoprojectoptionspropertycodeartifactoptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* [`projen.javascript.CodeArtifactOptions`](#projen.javascript.CodeArtifactOptions)
- *Default:* undefined

Options for publishing npm package to AWS CodeArtifact.

---

##### `deps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.deps" id="projenturborepoturborepoprojectoptionspropertydeps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* `string`[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g. `express`). This will behave similar to `yarn add` or `npm install` in the sense that it will add the module as a dependency to your `package.json` file with the latest version (`^`). You can specify semver requirements in the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and this will be what you `package.json` will eventually include.

---

##### `description`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.description" id="projenturborepoturborepoprojectoptionspropertydescription"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well. See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### `devDeps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.devDeps" id="projenturborepoturborepoprojectoptionspropertydevdeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* `string`[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be available in your build environment but will not be fetched when this module is consumed.  The recommendation is to only specify the module name here (e.g. `express`). This will behave similar to `yarn add` or `npm install` in the sense that it will add the module as a dependency to your `package.json` file with the latest version (`^`). You can specify semver requirements in the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and this will be what you `package.json` will eventually include.

---

##### `entrypoint`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.entrypoint" id="projenturborepoturborepoprojectoptionspropertyentrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* `string`
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`).

Set to an empty string to not include `main` in your package.json

---

##### `homepage`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.homepage" id="projenturborepoturborepoprojectoptionspropertyhomepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* `string`

Package's Homepage / Website.

---

##### `keywords`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.keywords" id="projenturborepoturborepoprojectoptionspropertykeywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* `string`[]

Keywords to include in `package.json`.

---

##### `license`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.license" id="projenturborepoturborepoprojectoptionspropertylicense"></a>

```typescript
public readonly license: string;
```

- *Type:* `string`
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses. Use the `licensed` option if you want to no license to be specified.

---

##### `licensed`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.licensed" id="projenturborepoturborepoprojectoptionspropertylicensed"></a>

```typescript
public readonly licensed: boolean;
```

- *Type:* `boolean`
- *Default:* true

Indicates if a license should be added.

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.maxNodeVersion" id="projenturborepoturborepoprojectoptionspropertymaxnodeversion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* `string`
- *Default:* no max

Minimum node.js version to require via `engines` (inclusive).

---

##### `minNodeVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.minNodeVersion" id="projenturborepoturborepoprojectoptionspropertyminnodeversion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* `string`
- *Default:* no "engines" specified

Minimum Node.js version to require via package.json `engines` (inclusive).

---

##### `npmAccess`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmAccess" id="projenturborepoturborepoprojectoptionspropertynpmaccess"></a>

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* [`projen.javascript.NpmAccess`](#projen.javascript.NpmAccess)
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### ~~`npmRegistry`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmRegistry" id="projenturborepoturborepoprojectoptionspropertynpmregistry"></a>

- *Deprecated:* use `npmRegistryUrl` instead

```typescript
public readonly npmRegistry: string;
```

- *Type:* `string`

The host name of the npm registry to publish to.

Cannot be set together with `npmRegistryUrl`.

---

##### `npmRegistryUrl`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmRegistryUrl" id="projenturborepoturborepoprojectoptionspropertynpmregistryurl"></a>

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* `string`
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmTokenSecret" id="projenturborepoturborepoprojectoptionspropertynpmtokensecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* `string`
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `packageManager`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.packageManager" id="projenturborepoturborepoprojectoptionspropertypackagemanager"></a>

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* [`projen.javascript.NodePackageManager`](#projen.javascript.NodePackageManager)
- *Default:* NodePackageManager.YARN

The Node Package Manager used to execute scripts.

---

##### `packageName`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.packageName" id="projenturborepoturborepoprojectoptionspropertypackagename"></a>

```typescript
public readonly packageName: string;
```

- *Type:* `string`
- *Default:* defaults to project name

The "name" in package.json.

---

##### `peerDependencyOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.peerDependencyOptions" id="projenturborepoturborepoprojectoptionspropertypeerdependencyoptions"></a>

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* [`projen.javascript.PeerDependencyOptions`](#projen.javascript.PeerDependencyOptions)

Options for `peerDeps`.

---

##### `peerDeps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.peerDeps" id="projenturborepoturborepoprojectoptionspropertypeerdeps"></a>

```typescript
public readonly peerDeps: string[];
```

- *Type:* `string`[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to be installed (and satisfied) by the _consumer_ of this library. Using peer dependencies allows you to ensure that only a single module of a certain library exists in the `node_modules` tree of your consumers.  Note that prior to npm@7, peer dependencies are _not_ automatically installed, which means that adding peer dependencies to a library will be a breaking change for your customers.  Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is enabled by default), projen will automatically add a dev dependency with a pinned version for each peer dependency. This will ensure that you build & test your module against the lowest peer version required.

---

##### `repository`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.repository" id="projenturborepoturborepoprojectoptionspropertyrepository"></a>

```typescript
public readonly repository: string;
```

- *Type:* `string`

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### `repositoryDirectory`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.repositoryDirectory" id="projenturborepoturborepoprojectoptionspropertyrepositorydirectory"></a>

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* `string`

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### `scripts`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.scripts" id="projenturborepoturborepoprojectoptionspropertyscripts"></a>

```typescript
public readonly scripts: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}
- *Default:* {}

npm scripts to include.

If a script has the same name as a standard script, the standard script will be overwritten.

---

##### `stability`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.stability" id="projenturborepoturborepoprojectoptionspropertystability"></a>

```typescript
public readonly stability: string;
```

- *Type:* `string`

Package's Stability.

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.jsiiReleaseVersion" id="projenturborepoturborepoprojectoptionspropertyjsiireleaseversion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* `string`
- *Default:* "latest"

Version requirement of `jsii-release` which is used to publish modules to npm.

---

##### `majorVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.majorVersion" id="projenturborepoturborepoprojectoptionspropertymajorversion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* `number`
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line. If not specified, we bump the global latest version.

---

##### `npmDistTag`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmDistTag" id="projenturborepoturborepoprojectoptionspropertynpmdisttag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* `string`
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property for each branch.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.postBuildSteps" id="projenturborepoturborepoprojectoptionspropertypostbuildsteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* [`projen.github.workflows.JobStep`](#projen.github.workflows.JobStep)[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.prerelease" id="projenturborepoturborepoprojectoptionspropertyprerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* `string`
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `publishDryRun`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.publishDryRun" id="projenturborepoturborepoprojectoptionspropertypublishdryrun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* `boolean`
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.publishTasks" id="projenturborepoturborepoprojectoptionspropertypublishtasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* `boolean`
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this in order to create a publishing task for each publishing activity.

---

##### `releaseBranches`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseBranches" id="projenturborepoturborepoprojectoptionspropertyreleasebranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: [`projen.release.BranchOptions`](#projen.release.BranchOptions)}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each release branch which will publish releases from commits in this branch. Each release branch _must_ be assigned a major version number which is used to enforce that versions published from that branch always use that major version. If multiple branches are used, the `majorVersion` field must also be provided for the default branch.

---

##### ~~`releaseEveryCommit`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseEveryCommit" id="projenturborepoturborepoprojectoptionspropertyreleaseeverycommit"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.continuous()` instead

```typescript
public readonly releaseEveryCommit: boolean;
```

- *Type:* `boolean`
- *Default:* true

Automatically release new versions every commit to one of branches in `releaseBranches`.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseFailureIssue" id="projenturborepoturborepoprojectoptionspropertyreleasefailureissue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* `boolean`
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseFailureIssueLabel" id="projenturborepoturborepoprojectoptionspropertyreleasefailureissuelabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* `string`
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### ~~`releaseSchedule`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseSchedule" id="projenturborepoturborepoprojectoptionspropertyreleaseschedule"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.scheduled()` instead

```typescript
public readonly releaseSchedule: string;
```

- *Type:* `string`
- *Default:* no scheduled releases

CRON schedule to trigger new releases.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseTagPrefix" id="projenturborepoturborepoprojectoptionspropertyreleasetagprefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* `string`
- *Default:* no prefix

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version when bumping, so if you change this on a project with an existing version history, you may need to manually tag your latest release with the new prefix.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseTrigger" id="projenturborepoturborepoprojectoptionspropertyreleasetrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* [`projen.release.ReleaseTrigger`](#projen.release.ReleaseTrigger)
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseWorkflowName" id="projenturborepoturborepoprojectoptionspropertyreleaseworkflowname"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* `string`
- *Default:* "Release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseWorkflowSetupSteps" id="projenturborepoturborepoprojectoptionspropertyreleaseworkflowsetupsteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* [`projen.github.workflows.JobStep`](#projen.github.workflows.JobStep)[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `versionrcOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.versionrcOptions" id="projenturborepoturborepoprojectoptionspropertyversionrcoptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: `any`}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with standard-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.workflowContainerImage" id="projenturborepoturborepoprojectoptionspropertyworkflowcontainerimage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* `string`
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.workflowRunsOn" id="projenturborepoturborepoprojectoptionspropertyworkflowrunson"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* `string`[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `defaultReleaseBranch`<sup>Required</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.defaultReleaseBranch" id="projenturborepoturborepoprojectoptionspropertydefaultreleasebranch"></a>

```typescript
public readonly defaultReleaseBranch: string;
```

- *Type:* `string`
- *Default:* "main"

The name of the main release branch.

---

##### `artifactsDirectory`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.artifactsDirectory" id="projenturborepoturborepoprojectoptionspropertyartifactsdirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* `string`
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `autoApproveProjenUpgrades`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.autoApproveProjenUpgrades" id="projenturborepoturborepoprojectoptionspropertyautoapproveprojenupgrades"></a>

```typescript
public readonly autoApproveProjenUpgrades: boolean;
```

- *Type:* `boolean`
- *Default:* false

Automatically approve projen upgrade PRs, allowing them to be merged by mergify (if configued).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `autoApproveUpgrades`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.autoApproveUpgrades" id="projenturborepoturborepoprojectoptionspropertyautoapproveupgrades"></a>

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* `boolean`
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configued).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.buildWorkflow" id="projenturborepoturborepoprojectoptionspropertybuildworkflow"></a>

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* `boolean`
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### `bundlerOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.bundlerOptions" id="projenturborepoturborepoprojectoptionspropertybundleroptions"></a>

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* [`projen.javascript.BundlerOptions`](#projen.javascript.BundlerOptions)

Options for `Bundler`.

---

##### `codeCov`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.codeCov" id="projenturborepoturborepoprojectoptionspropertycodecov"></a>

```typescript
public readonly codeCov: boolean;
```

- *Type:* `boolean`
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v1 A secret is required for private repos. Configured with @codeCovTokenSecret.

---

##### `codeCovTokenSecret`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.codeCovTokenSecret" id="projenturborepoturborepoprojectoptionspropertycodecovtokensecret"></a>

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* `string`
- *Default:* if this option is not specified, only public repositories are supported

Define the secret name for a specified https://codecov.io/ token A secret is required to send coverage for private repositories.

---

##### `copyrightOwner`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.copyrightOwner" id="projenturborepoturborepoprojectoptionspropertycopyrightowner"></a>

```typescript
public readonly copyrightOwner: string;
```

- *Type:* `string`
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### `copyrightPeriod`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.copyrightPeriod" id="projenturborepoturborepoprojectoptionspropertycopyrightperiod"></a>

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* `string`
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### `dependabot`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.dependabot" id="projenturborepoturborepoprojectoptionspropertydependabot"></a>

```typescript
public readonly dependabot: boolean;
```

- *Type:* `boolean`
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### `dependabotOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.dependabotOptions" id="projenturborepoturborepoprojectoptionspropertydependabotoptions"></a>

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* [`projen.github.DependabotOptions`](#projen.github.DependabotOptions)
- *Default:* default options

Options for dependabot.

---

##### `depsUpgrade`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.depsUpgrade" id="projenturborepoturborepoprojectoptionspropertydepsupgrade"></a>

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* `boolean`
- *Default:* true

Use github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### `depsUpgradeOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.depsUpgradeOptions" id="projenturborepoturborepoprojectoptionspropertydepsupgradeoptions"></a>

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* [`projen.javascript.UpgradeDependenciesOptions`](#projen.javascript.UpgradeDependenciesOptions)
- *Default:* default options

Options for depsUpgrade.

---

##### `gitignore`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.gitignore" id="projenturborepoturborepoprojectoptionspropertygitignore"></a>

```typescript
public readonly gitignore: string[];
```

- *Type:* `string`[]

Additional entries to .gitignore.

---

##### `jest`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.jest" id="projenturborepoturborepoprojectoptionspropertyjest"></a>

```typescript
public readonly jest: boolean;
```

- *Type:* `boolean`
- *Default:* true

Setup jest unit tests.

---

##### `jestOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.jestOptions" id="projenturborepoturborepoprojectoptionspropertyjestoptions"></a>

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* [`projen.javascript.JestOptions`](#projen.javascript.JestOptions)
- *Default:* default options

Jest options.

---

##### `mutableBuild`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.mutableBuild" id="projenturborepoturborepoprojectoptionspropertymutablebuild"></a>

```typescript
public readonly mutableBuild: boolean;
```

- *Type:* `boolean`
- *Default:* true

Automatically update files modified during builds to pull-request branches.

This means that any files synthesized by projen or e.g. test snapshots will always be up-to-date before a PR is merged.  Implies that PR builds do not have anti-tamper checks.

---

##### ~~`npmignore`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmignore" id="projenturborepoturborepoprojectoptionspropertynpmignore"></a>

- *Deprecated:* - use `project.addPackageIgnore`

```typescript
public readonly npmignore: string[];
```

- *Type:* `string`[]

Additional entries to .npmignore.

---

##### `npmignoreEnabled`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.npmignoreEnabled" id="projenturborepoturborepoprojectoptionspropertynpmignoreenabled"></a>

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* `boolean`
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### `package`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.package" id="projenturborepoturborepoprojectoptionspropertypackage"></a>

```typescript
public readonly package: boolean;
```

- *Type:* `boolean`
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### `prettier`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.prettier" id="projenturborepoturborepoprojectoptionspropertyprettier"></a>

```typescript
public readonly prettier: boolean;
```

- *Type:* `boolean`
- *Default:* false

Setup prettier.

---

##### `prettierOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.prettierOptions" id="projenturborepoturborepoprojectoptionspropertyprettieroptions"></a>

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* [`projen.javascript.PrettierOptions`](#projen.javascript.PrettierOptions)
- *Default:* default options

Prettier options.

---

##### `projenDevDependency`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenDevDependency" id="projenturborepoturborepoprojectoptionspropertyprojendevdependency"></a>

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* `boolean`
- *Default:* true

Indicates of "projen" should be installed as a devDependency.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenrcJs" id="projenturborepoturborepoprojectoptionspropertyprojenrcjs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* `boolean`
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenrcJsOptions" id="projenturborepoturborepoprojectoptionspropertyprojenrcjsoptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* [`projen.javascript.ProjenrcOptions`](#projen.javascript.ProjenrcOptions)
- *Default:* default options

Options for .projenrc.js.

---

##### ~~`projenUpgradeAutoMerge`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenUpgradeAutoMerge" id="projenturborepoturborepoprojectoptionspropertyprojenupgradeautomerge"></a>

- *Deprecated:* use `autoApproveProjenUpgrades`.

```typescript
public readonly projenUpgradeAutoMerge: boolean;
```

- *Type:* `boolean`
- *Default:* false

Automatically approve projen upgrade PRs, allowing them to be merged by mergify (if configued).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `projenUpgradeSchedule`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenUpgradeSchedule" id="projenturborepoturborepoprojectoptionspropertyprojenupgradeschedule"></a>

```typescript
public readonly projenUpgradeSchedule: string[];
```

- *Type:* `string`[]
- *Default:* [ "0 6 * * *" ]

Customize the projenUpgrade schedule in cron expression.

---

##### ~~`projenUpgradeSecret`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenUpgradeSecret" id="projenturborepoturborepoprojectoptionspropertyprojenupgradesecret"></a>

- *Deprecated:* use `githubTokenSecret` instead.

```typescript
public readonly projenUpgradeSecret: string;
```

- *Type:* `string`
- *Default:* no automatic projen upgrade pull requests

Periodically submits a pull request for projen upgrades (executes `yarn projen:upgrade`).

This setting is a GitHub secret name which contains a GitHub Access Token with `repo` and `workflow` permissions.  This token is used to submit the upgrade pull request, which will likely include workflow updates.  To create a personal access token see https://github.com/settings/tokens

---

##### `projenVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenVersion" id="projenturborepoturborepoprojectoptionspropertyprojenversion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* `string`
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.pullRequestTemplate" id="projenturborepoturborepoprojectoptionspropertypullrequesttemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* `boolean`
- *Default:* true

Include a GitHub pull request template.

---

##### `pullRequestTemplateContents`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.pullRequestTemplateContents" id="projenturborepoturborepoprojectoptionspropertypullrequesttemplatecontents"></a>

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* `string`[]
- *Default:* default content

The contents of the pull request template.

---

##### `release`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.release" id="projenturborepoturborepoprojectoptionspropertyrelease"></a>

```typescript
public readonly release: boolean;
```

- *Type:* `boolean`
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### `releaseToNpm`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseToNpm" id="projenturborepoturborepoprojectoptionspropertyreleasetonpm"></a>

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* `boolean`
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### ~~`releaseWorkflow`~~<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.releaseWorkflow" id="projenturborepoturborepoprojectoptionspropertyreleaseworkflow"></a>

- *Deprecated:* see `release`.

```typescript
public readonly releaseWorkflow: boolean;
```

- *Type:* `boolean`
- *Default:* true if not a subproject

DEPRECATED: renamed to `release`.

---

##### `workflowBootstrapSteps`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.workflowBootstrapSteps" id="projenturborepoturborepoprojectoptionspropertyworkflowbootstrapsteps"></a>

```typescript
public readonly workflowBootstrapSteps: any[];
```

- *Type:* `any`[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### `workflowGitIdentity`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.workflowGitIdentity" id="projenturborepoturborepoprojectoptionspropertyworkflowgitidentity"></a>

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* [`projen.github.GitIdentity`](#projen.github.GitIdentity)
- *Default:* GitHub Actions

The git identity to use in workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.workflowNodeVersion" id="projenturborepoturborepoprojectoptionspropertyworkflownodeversion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* `string`
- *Default:* same as `minNodeVersion`

The node version to use in GitHub workflows.

---

##### `disableTsconfig`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.disableTsconfig" id="projenturborepoturborepoprojectoptionspropertydisabletsconfig"></a>

```typescript
public readonly disableTsconfig: boolean;
```

- *Type:* `boolean`
- *Default:* false

Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).

---

##### `docgen`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.docgen" id="projenturborepoturborepoprojectoptionspropertydocgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* `boolean`
- *Default:* false

Docgen by Typedoc.

---

##### `docsDirectory`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.docsDirectory" id="projenturborepoturborepoprojectoptionspropertydocsdirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* `string`
- *Default:* "docs"

Docs directory.

---

##### `entrypointTypes`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.entrypointTypes" id="projenturborepoturborepoprojectoptionspropertyentrypointtypes"></a>

```typescript
public readonly entrypointTypes: string;
```

- *Type:* `string`
- *Default:* .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)

The .d.ts file that includes the type declarations for this module.

---

##### `eslint`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.eslint" id="projenturborepoturborepoprojectoptionspropertyeslint"></a>

```typescript
public readonly eslint: boolean;
```

- *Type:* `boolean`
- *Default:* true

Setup eslint.

---

##### `eslintOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.eslintOptions" id="projenturborepoturborepoprojectoptionspropertyeslintoptions"></a>

```typescript
public readonly eslintOptions: EslintOptions;
```

- *Type:* [`projen.javascript.EslintOptions`](#projen.javascript.EslintOptions)
- *Default:* opinionated default options

Eslint options.

---

##### `libdir`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.libdir" id="projenturborepoturborepoprojectoptionspropertylibdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* `string`
- *Default:* "lib"

Typescript  artifacts output directory.

---

##### `projenrcTs`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenrcTs" id="projenturborepoturborepoprojectoptionspropertyprojenrcts"></a>

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* `boolean`
- *Default:* false

Use TypeScript for your projenrc file (`.projenrc.ts`).

---

##### `projenrcTsOptions`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.projenrcTsOptions" id="projenturborepoturborepoprojectoptionspropertyprojenrctsoptions"></a>

```typescript
public readonly projenrcTsOptions: ProjenrcOptions;
```

- *Type:* [`projen.typescript.ProjenrcOptions`](#projen.typescript.ProjenrcOptions)

Options for .projenrc.ts.

---

##### `sampleCode`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.sampleCode" id="projenturborepoturborepoprojectoptionspropertysamplecode"></a>

```typescript
public readonly sampleCode: boolean;
```

- *Type:* `boolean`
- *Default:* true

Generate one-time sample in `src/` and `test/` if there are no files there.

---

##### `srcdir`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.srcdir" id="projenturborepoturborepoprojectoptionspropertysrcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* `string`
- *Default:* "src"

Typescript sources directory.

---

##### `testdir`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.testdir" id="projenturborepoturborepoprojectoptionspropertytestdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* `string`
- *Default:* "test"

Jest tests directory. Tests files should be named `xxx.test.ts`.

If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`), then tests are going to be compiled into `lib/` and executed as javascript. If the test directory is outside of `src`, then we configure jest to compile the code in-memory.

---

##### `tsconfig`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.tsconfig" id="projenturborepoturborepoprojectoptionspropertytsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfigOptions;
```

- *Type:* [`projen.javascript.TypescriptConfigOptions`](#projen.javascript.TypescriptConfigOptions)
- *Default:* default options

Custom TSConfig.

---

##### `tsconfigDev`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.tsconfigDev" id="projenturborepoturborepoprojectoptionspropertytsconfigdev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfigOptions;
```

- *Type:* [`projen.javascript.TypescriptConfigOptions`](#projen.javascript.TypescriptConfigOptions)
- *Default:* use the production tsconfig options

Custom tsconfig options for the development tsconfig.json file (used for testing).

---

##### `tsconfigDevFile`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.tsconfigDevFile" id="projenturborepoturborepoprojectoptionspropertytsconfigdevfile"></a>

```typescript
public readonly tsconfigDevFile: string;
```

- *Type:* `string`
- *Default:* "tsconfig.dev.json"

The name of the development tsconfig.json file.

---

##### `typescriptVersion`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.typescriptVersion" id="projenturborepoturborepoprojectoptionspropertytypescriptversion"></a>

```typescript
public readonly typescriptVersion: string;
```

- *Type:* `string`
- *Default:* "latest"

TypeScript version to use.

NOTE: Typescript is not semantically versioned and should remain on the same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).

---

##### `pathMapping`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.pathMapping" id="projenturborepoturborepoprojectoptionspropertypathmapping"></a>

```typescript
public readonly pathMapping: boolean;
```

- *Type:* `boolean`
- *Default:* false

Add TypeScript path maps in the root project for sub-projects.

---

##### `turbo`<sup>Optional</sup> <a name="projen-turborepo.TurborepoProjectOptions.property.turbo" id="projenturborepoturborepoprojectoptionspropertyturbo"></a>

```typescript
public readonly turbo: TurborepoConfig;
```

- *Type:* [`projen-turborepo.TurborepoConfig`](#projen-turborepo.TurborepoConfig)
- *Default:* {}

Turborepo config options.

---

## Classes <a name="Classes" id="classes"></a>

### TurborepoProject <a name="projen-turborepo.TurborepoProject" id="projenturborepoturborepoproject"></a>

#### Initializers <a name="projen-turborepo.TurborepoProject.Initializer" id="projenturborepoturborepoprojectinitializer"></a>

```typescript
import { TurborepoProject } from 'projen-turborepo'

new TurborepoProject(options: TurborepoProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`options`](#projenturborepoturborepoprojectparameteroptions)<span title="Required">*</span> | [`projen-turborepo.TurborepoProjectOptions`](#projen-turborepo.TurborepoProjectOptions) | *No description.* |

---

##### `options`<sup>Required</sup> <a name="projen-turborepo.TurborepoProject.parameter.options" id="projenturborepoturborepoprojectparameteroptions"></a>

- *Type:* [`projen-turborepo.TurborepoProjectOptions`](#projen-turborepo.TurborepoProjectOptions)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`preSynthesize`](#projenturborepoturborepoprojectpresynthesize) | (experimental) Called before all components are synthesized. |

---

##### `preSynthesize` <a name="projen-turborepo.TurborepoProject.preSynthesize" id="projenturborepoturborepoprojectpresynthesize"></a>

```typescript
public preSynthesize()
```





