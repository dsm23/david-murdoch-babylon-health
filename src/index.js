import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';

import AppProviders from 'components/app-providers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);
registerServiceWorker();
