import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

let div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<p>Testando v2</p>
	</StrictMode>
);
