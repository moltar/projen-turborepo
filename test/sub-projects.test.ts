import { synthProjectSnapshot, createSubProject, createProject } from './util';

describe('TurborepoProject', () => {
  it('should add workspaces', () => {
    expect.assertions(1);

    const project = createProject();

    const subProjectDir = 'packages/baz';

    createSubProject({
      parent: project,
      outdir: subProjectDir,
    });

    const synth = synthProjectSnapshot(project);

    expect(synth['package.json'].workspaces).toStrictEqual([subProjectDir]);
  });
});