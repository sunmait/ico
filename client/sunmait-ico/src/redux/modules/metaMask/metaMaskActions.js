import CONSTANTS from './metaMaskConstants';
import { notifSend } from 'redux-notifications/lib/actions';
import getEthPriceHelper from '../../../helpers/getEthPrice';
import getWeb3Provider from '../../../helpers/getWeb3Provider';


//TODO Add saga to handle multy async requests flow
export const setWeb3Provider = () => async dispatch => {
  try {
    const localWeb3 = await getWeb3Provider();
    
    dispatch({
      type: CONSTANTS.GET_WEB3_PROVIDER,
      payload: localWeb3
    });

    dispatch({
      type: CONSTANTS.GET_CURRENT_METAMASK_ACCOUNT,
      payload: localWeb3.eth.defaultAccount
    });
  } catch (error) {
    dispatch(notifSend({
      message: error,
      kind: 'warning',
      dismissAfter: 2000
    }));

    throw error;
  }
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