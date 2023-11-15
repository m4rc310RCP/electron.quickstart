const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	notificationApi: {
		sendNotification(message) {
			ipcRenderer.send('notify', message);
		},
	},
	windowApi: {
		title(title) {
			ipcRenderer.send('title', title);
		},
		close(options) {
			ipcRenderer.send('close', options);
		},
		restart() {
			ipcRenderer.send('restart');
		},
		hostname() {
			return ipcRenderer.invoke('hostname');
		},
	},
	uriApi: {
		serverUri() {
			return ipcRenderer.invoke('server_uris');
		},
	},
	batteryApi: {},
	filesApi: {
		translatePath(locale){
			return ipcRenderer.invoke('translate_path', locale);
		}
	},
});

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency]);
	}
});
