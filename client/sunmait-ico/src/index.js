import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Notifs } from 'redux-notifications';
import store from './redux/store';
import AppContainer from './components/AppContainer';
import * as serviceWorker from './serviceWorker';
import 'redux-notifications/lib/styles.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <AppContainer />
      <Notifs />
    </div>
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
