import { tree } from './tree';

it('tree', () => {
  const steps = [
    { id: 'install', waitFor: undefined },
    { id: 'lint', waitFor: [ 'install' ] },
    { id: 'test', waitFor: [ 'install' ] },
    { id: 'app-build', waitFor: [ 'lint', 'test' ] },
    { id: 'lighthouse', waitFor: [ 'app-build' ] },
    { id: 'storybook-build', waitFor: [ 'lint', 'test' ] },
    {
      id: 'export-assets-and-routes',
      waitFor: [ 'lint', 'test', 'storybook-build' ]
    },
    {
      id: 'prune',
      waitFor: [ 'app-build', 'storybook-build', 'export-assets-and-routes' ]
    },
    { id: 'docker-build', waitFor: [ 'prune' ] },
    { id: 'upload-assets', waitFor: [ 'docker-build' ] },
    { id: 'upload-icons', waitFor: [ 'app-build' ] },
    {
      id: 'upload-storybook',
      waitFor: [ 'storybook-build', 'export-assets-and-routes' ]
    },
    { id: 'sentry-release', waitFor: undefined },
    { id: 'sentry-release-commits', waitFor: undefined },
    { id: 'sentry-release-files', waitFor: undefined }
  ]

  expect(tree(steps))
    .toEqual([])
});