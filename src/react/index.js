import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { MAppTest } from './containers';
import { Mi8nProvider } from './contexts';
import './style.css';

let div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);

const root = createRoot(document.getElementById('root'));

// const handleNotification = () => {
// 	const msg = {title:'Test Message', body:'My message'};
// 	electron.notificationApi.sendNotification(msg);
// }className="text-3xl font-bold underline"

root.render(
	<StrictMode>
		<Mi8nProvider>
			<MAppTest />
		</Mi8nProvider>
	</StrictMode>
);
