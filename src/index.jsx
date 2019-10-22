import './normolize.css';

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AppContainer } from 'containers/AppContainer';

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
