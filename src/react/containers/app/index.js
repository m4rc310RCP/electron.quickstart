import React, { useState } from 'react';
import { Modal } from '../../components';
import { useTranslate } from '../../hooks';

export const MAppTest = () => {
	const [showModalTest, setShowModalTest] = useState(false);
	const { m, format } = useTranslate();

	const handleNotification = () => {
		const msg = { title: 'Title Message', body: 'Teste Notification' };
		electron.notificationApi.sendNotification(msg);
	};

	const classNameButtons = 'text-xs bg-slate-400  hover:bg-slate-500 rounded-sm px-2 text-gray-300  gap-1';

	return (
		<div className="flex gap-1 p-2">
			<button className={classNameButtons} onClick={() => handleNotification()}>
				{m.notification}
			</button>
			<button className={classNameButtons} onClick={() => electron.windowApi.title('Change Title')}>
				{m.change_title}
			</button>
			<button className={classNameButtons} onClick={() => electron.windowApi.close()}>
				{m.close}
			</button>
			<button className={classNameButtons} onClick={() => electron.windowApi.restart()}>
				{m.restart_app}
			</button>
			<button
				className={classNameButtons}
				onClick={() =>
					electron.windowApi.hostname().then((result) => {
						console.log(result);
					})
				}
			>
				Get Hostname
			</button>
			<button
				className={classNameButtons}
				onClick={() =>
					electron.uriApi.serverUri().then(({ auth_uri }) => {
						console.log(auth_uri);
					})
				}
			>
				URI's
			</button>
			<button className={classNameButtons} onClick={() => setShowModalTest(true)}>
				{format(m.modal, 'Modal', 'Close')}
			</button>
			<Modal isOpen={showModalTest}>
				<div className='p-1'>
					<h1>Modal</h1>
					<button onClick={() => setShowModalTest(false)}>Sair</button>
				</div>
			</Modal>
		</div>
	);
};
