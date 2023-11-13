import React, { useContext, createContext, useState, useEffect } from 'react';

const I18nContext = createContext(null);

export const Mi8nProvider = ({ children }) => {
	const [locale, setLocale] = useState('pt');
	const [message, setMessage] = useState({});

	useEffect(() => {
		const loadTranslation = async () => {
			try {
				const path = await electron.filesApi.translatePath(locale);
				const response = await fetch(path);
				const dt = await response.json();
				setMessage(dt);
			} catch (error) {
				console.error('Error loading translations:', error);
			}
		};
		loadTranslation();
	}, [locale]);

	const switchLanguage = (locale) => {
		setLocale(locale);
	};

	const data = { m:message, format: (key, ...args)=>{
		const template = message[key]||`${key}`;
		return template.replace(/{(\d+)}/g, (_, index) => args[index])
	}, switchLanguage };
	return <I18nContext.Provider value={data}>{children}</I18nContext.Provider>;
};

export const useTranslate = () => useContext(I18nContext);
