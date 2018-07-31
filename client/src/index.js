import 'rxjs/Rx';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore({});

const theme = {
  palette: {
    primary: 'black',
    secondary: 'black',
    danger: 'red',
    background: {
      primary: '#FFFFFF',
      secondary: '#c9ceeb',
    },
  },
  zIndex: {
    appBar: 100,
  },
};

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
