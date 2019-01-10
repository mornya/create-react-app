import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
// To "Code Splitting", be importing React-Router modules by like this.
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import HashRouter from 'react-router-dom/es/HashRouter';
import * as serviceWorker from './serviceWorker';
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
          <EntryApp/>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

/**
 * ========== 초기화 ==========
 */
// Service-worker 등록시 serviceWorker.unregister() -> serviceWorker.register()로 변경
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// <html lang=""> 속성 미존재시 등록
const elHTML = document.querySelector('html');
if (!elHTML.getAttribute('lang')) {
  elHTML.setAttribute('lang', navigator.language);
}

// Initialize App
renderAppContainer(App);

// Hot Module Reload
module.hot &&
  module.hot.accept('./App', () =>
    renderAppContainer(require('./App').default)
  );
