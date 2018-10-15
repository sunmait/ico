import CONSTANTS from './metaMaskConstants';

const defaultState = {
  providerConnected: false,
  currentAccount: null,
  ethPrice: null,
  localWeb3: null
};

const setWeb3Provider = (state, provider) => {
  return {
    ...state,
    localWeb3: provider,
    providerConnected: true
  };
}

const setCurrentMetamaskAccount = (state, account) => {
  return {
    ...state,
    currentAccount: account,
    isCurrentGameLoaded: true
  };
}

const setEthPrice = (state, ethPrice) => {
  return {
    ...state,
    ethPrice
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_WEB3_PROVIDER:
      return setWeb3Provider(state, action.payload);

    case CONSTANTS.GET_CURRENT_METAMASK_ACCOUNT:
      return setCurrentMetamaskAccount(state, action.payload);

    case CONSTANTS.GET_ETH_PRICE:
      return setEthPrice(state, action.payload);

    default:
      return state;
  };
};
