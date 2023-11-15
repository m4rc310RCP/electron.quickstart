import React, { useContext, createContext, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks';


const WindowContext = createContext(null);

export const MWindowProvider = ({ children }) => {
    const { m, format } = useTranslate();

    const closeApp = (confirm) => {
        const options = {
            type: 'question',
            buttons: [m.close_application, m.cancel],
            defaultId: 0,
            title: m.close,
            message: m.question_close_window,
            detail: m.instruction_before_close,
            //checkboxLabel: 'Remember my answer',
            confirm:true,
            //checkboxChecked: true,
        }

        electron.windowApi.close(options)
    }


	const data = { closeApp };

	return <WindowContext.Provider value={data}>{children}</WindowContext.Provider>;
};

export const useWindow = () => useContext(WindowContext);