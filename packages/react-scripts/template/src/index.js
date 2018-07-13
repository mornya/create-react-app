import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// To "Code Splitting", be importing React-Router modules by like this.
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import HashRouter from 'react-router-dom/es/HashRouter';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

// 스타일 적용 (순서주의)
import 'normalize-css'; // webpack-aliased by unable search module normalize.css
// App.jsx에서 App.scss가 로딩되므로 최종적으로 import
import App from './App';

const Router = window.history.pushState ? BrowserRouter : HashRouter;
const renderAppContainer = EntryApp => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={Store}>
        <Router>
          <EntryApp />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// ========== 초기화 ==========
const elHTML = document.querySelector('html');
elHTML.setAttribute('ua', navigator.userAgent); // UA string 등록
elHTML.setAttribute('lang', navigator.language); // lang string 등록

registerServiceWorker(); // Service-worker 등록
injectTapEventPlugin(); // onTouchTap 이벤트의 polyfill

// Initialize App
renderAppContainer(App);

// Hot Module Reload
module.hot &&
  module.hot.accept('./App', () =>
    renderAppContainer(require('./App').default)
  );
