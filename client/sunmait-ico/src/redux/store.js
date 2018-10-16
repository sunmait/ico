import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tokenPurchaseFormMiddleware from './middlewares/tokenPurchaseFormMiddleware';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, tokenPurchaseFormMiddleware)
  )
);

export default store;
