const { app } = require('electron');

function restartApp() {
  const appPath = app.getPath('exe');
  const args = process.argv.slice(1);

  require('child_process').spawn(appPath, args, {
    detached: true,
    stdio: 'ignore',
  }).unref();

  app.quit();
}

restartApp();