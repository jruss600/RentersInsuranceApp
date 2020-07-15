import React from 'react';
import ReactDOM from 'react-dom';
import './app/components/styles.css';
import App from './app/components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
