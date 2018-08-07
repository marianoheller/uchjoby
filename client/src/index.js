import 'rxjs/Rx';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore({});

const theme = {
  palette: {
    primary: 'white',
    secondary: '#DDDDDD',
    danger: 'red',
    background: {
      primary: '#4257B2',
      secondary: '#F0F0F0',
    },
    button: {
      normal: '#3CCFCF', //teal like
      selected: '#FFCD1F', //yellow
    }
  },
  zIndex: {
    flashcard: 100,
  },
};

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
