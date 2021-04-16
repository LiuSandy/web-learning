import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store/react-redux/index';
import App from './app1';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
