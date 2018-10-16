import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import metaMask from './modules/metaMask/metaMaskReducer';
import contracts from './modules/contracts/contractsReducer';
import crowdsale from './modules/crowdsale/crowdsaleReducer';
import modal from './modules/modal/modalReducer';

const rootReducer = combineReducers({
  metaMask,
  contracts,
  crowdsale,
  modal,
  form: formReducer,
});

export default rootReducer;