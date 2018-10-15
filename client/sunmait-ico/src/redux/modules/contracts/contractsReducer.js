import CONSTANTS from './contractsConstants';

const defaultState = {
  contractsLoaded: false,
  crowdsaleContract: null,
  tokenContract: null,
};

const setContractsABI = (state, payload) => ({
    ...state,
    crowdsaleContract: payload.crowdsaleContract,
    tokenContract: payload.tokenContract,
    contractsLoaded: true
});

const setCrowdsaleStatus = (state, payload) => ({
  ...state,
  crowdsaleStatus: payload
});

const setUserBalance = (state, payload) => ({
  ...state,
  userBalance: payload
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_CONTRACTS_ABI:
      return setContractsABI(state, action.payload);
    case CONSTANTS.GET_CROWDSALE_STATUS:
      return setCrowdsaleStatus(state, action.payload);
    case CONSTANTS.GET_USER_BALANCE:
      return setUserBalance(state, action.payload);
    default:
      return state;
  };
};