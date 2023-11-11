const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('node:path');
const electronReload = require('electron-reload');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
};

if (isDev) {
	let electron_path = path.join(__dirname, '../../node_modules', '.bin', 'electron');

	let pathSource = path.join(__dirname, '../');

	electronReload(pathSource, {
		electron: electron_path,
		forceHardReset: true,
		hardResetMethod: 'exit',
	});

	//require('electron-reload')(__dirname, {
	//	electron: electron_path,
	//});
}

app.on('window-all-closed', () => {
	//if (process.platform !== 'darwin')
	app.quit();
});

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
