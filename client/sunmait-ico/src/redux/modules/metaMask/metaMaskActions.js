import CONSTANTS from './metaMaskConstants';
import getEthPriceHelper from '../../../helpers/getEthPrice';
import getWeb3Provider from '../../../helpers/getWeb3Provider';

export const setWeb3Provider = () => async dispatch => {
  await getWeb3Provider()
    .then(localWeb3 => {
      dispatch({
        type: CONSTANTS.GET_WEB3_PROVIDER,
        payload: localWeb3
      });

      dispatch({
        type: CONSTANTS.GET_CURRENT_METAMASK_ACCOUNT,
        payload: localWeb3.eth.defaultAccount
      });
    });
};

export const getEthPrice = () => dispatch => {
  getEthPriceHelper()
    .then(payload => {
      return dispatch({
        type: CONSTANTS.GET_ETH_PRICE,
        payload
      });
    });
};