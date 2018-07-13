import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [reduxThunk];

const configureStore = initialState => {
  // Redux devtool 크롬 익스텐션 사용 시 applyMiddleware를 createStore의 인자로 넘기면 정상적으로 작동되지 않는다.
  return applyMiddleware(...middlewares)(createStore)(
    reducers,
    initialState || window.__initialState__,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
};

// 생성된 Redux Store를 리턴하여 provider에 전달 및 코드 상에서 스토어 조작이 가능하다.
export default configureStore();
