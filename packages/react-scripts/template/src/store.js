import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import reducers from './reducers';

let configureStore;

if (process.env.NODE_ENV === 'test') {
  // 테스트 환경에서는 mocking된 스토어를 리턴
  const mockStore = configureMockStore();
  configureStore = mockStore({});
} else {
  // 개발/프로덕션 환경에서 미들웨어 설정 및 스토어를 리턴
  const middlewares = [reduxThunk];

  configureStore = (initialState => {
    // Redux devtool 크롬 익스텐션 사용 시 applyMiddleware를 createStore의 인자로 넘기면 정상적으로 작동되지 않는다.
    return applyMiddleware(...middlewares)(createStore)(
      reducers,
      initialState || window.__initialState__,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  })();
}

// 생성된 Redux Store를 리턴하여 provider에 전달 및 코드 상에서 스토어 조작이 가능하다.
export default configureStore;
