// Root.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App.jsx'; // Correct the path if needed

function Root() {
    return (
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    );
}

export default Root;