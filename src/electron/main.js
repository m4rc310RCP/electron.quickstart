const { app, ipcMain, Notification, dialog, BrowserWindow, Menu, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');
const path = require('node:path');
const os = require('os');
const electronReload = require('electron-reload');
const dotenv = require('dotenv');
const Store = require('electron-store');
const store = new Store();

dotenv.config({ path: path.join(__dirname, '.env') });

let win;

const ID_SALES_URL = 'br.com.m4rc310.sales.url';

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
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



ipcMain.on('notify', (_, { title, body }) => {
	new Notification({ title, body }).show();
});

ipcMain.handle('hostname', async (_) => {
	return `${os.hostname}`;
});

ipcMain.handle('translate_path', async (_, locale) => {
	return path.join(__dirname, 'locales', `${locale}.json`)
});

ipcMain.handle('server_uris', async (_) => {
	const auth_uri = process.env.AUTH_URI || 'https://auth.m4rc310.com.br';
	const sales_uri = store.get(ID_SALES_URL) || '';
	return { auth_uri, sales_uri };
});

ipcMain.on('close', (_, confirm) => {
	const options = {
		type: 'question',
		buttons: ['Close Apllication', 'Cancel'],
		defaultId: 2,
		title: 'Question',
		message: 'message',
		detail: 'It does not really matter',
		checkboxLabel: 'Remember my answer',
		checkboxChecked: true,
	};

	if (confirm) {
		dialog.showMessageBox(null, options).then(({ response, checkboxChecked }) => {
			if (response === 0) {
				win.close();
			}
		});
	} else {
		win.close();
	}

	//dialog.showMessageBox(null, options, (response, checkboxChecked) => {
	//	console.log(response);
	//	console.log(checkboxChecked);
	//win.close();
	// });
});

ipcMain.on('restart', (_) => {
	//exec('npm run restart', (error, stdout, stderr)=>{
	//	if (error) {
	//		console.error(`Erro ao reiniciar o aplicativo: ${error}`);
	//	  } else {
	//		console.log(`Aplicativo reiniciado com sucesso: ${stdout}`);
	//	  }
	//});
});

ipcMain.on('title', (_, title) => {
	win.setTitle(title);
});

app.on('window-all-closed', () => {
	//if (process.platform !== 'darwin')
	app.quit();
});

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	globalShortcut.register('F10', ()=>{
		if (win){
			win.webContents.toggleDevTools();
		}
	});


});

app.on('will-quit', () => globalShortcut.unregisterAll());

const menu = Menu.buildFromTemplate([]);
Menu.setApplicationMenu(menu);