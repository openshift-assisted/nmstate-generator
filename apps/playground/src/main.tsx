/* NOTE: Keep the patternfly base.css import at the top so the base css
   is processed before any component css */
import '@patternfly/react-core/dist/styles/base.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './main.css';
import './monacoEditorWorker';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
