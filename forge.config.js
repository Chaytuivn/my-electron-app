const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        // authToken: process.env.GITHUB_TOKEN,
        repository: {
          owner: 'Chaytuivn',
          name: 'my-electron-app'
        },
        prerelease: false,
        draft: false
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "my-electron-app",
        certificateFile: 'D:/cer_test/MyElectronAppCert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
        // exe: "MyElectronApp.exe",
        // setupExe: "MyElectronAppSetup.exe",
        setupIcon: "D:/NodeJs/auto-profile/ng-front-end/public/logo.ico",
        shortcutName: "My Electron App",
        noMsi: true,
        runAfter: false
      },
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
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
