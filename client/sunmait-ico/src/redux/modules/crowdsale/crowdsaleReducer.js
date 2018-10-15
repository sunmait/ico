import CONSTANTS from './crowdsaleConstants';

const defaultState = {
  crowdsaleDetails: {
    status: undefined,
    startDate: undefined,
    phase1EndDate: undefined,
    endDate: undefined,
    phase1TokenPrice: undefined,
    phase2TokenPrice: undefined,
    currentTokenPrice: undefined,
  }
};

const setCrowdsaleDetails = (state, payload) => ({
  ...state,
  crowdsaleDetails: payload
})

const setUserBalance = (state, payload) => ({
  ...state,
  userBalance: payload
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_CROWDSALE_DETAILS:
      return setCrowdsaleDetails(state, action.payload);
    case CONSTANTS.GET_USER_BALANCE:
      return setUserBalance(state, action.payload);
    default:
      return state;
  };
};