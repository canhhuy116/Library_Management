import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import '@/assets/scss/style.scss';
import { Provider } from 'mobx-react';
import initializeStores from './store/initializeStore';

const container = document.getElementById('root');
const root = createRoot(container!);
const stores = initializeStores();

const app = (
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(app);
