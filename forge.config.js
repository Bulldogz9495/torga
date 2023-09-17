module.exports = {
  packagerConfig: {
    asar: true,
    // Specify target platforms (all three major OSes)
    targets: [
      { platform: 'win32', arch: 'x64' },
      { platform: 'darwin', arch: 'x64' },
      { platform: 'linux', arch: 'x64' },
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Bulldogz9495',
          name: 'torga'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};
