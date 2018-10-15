import CONSTANTS from './contractsConstants';
import contractAddresses from '../../../helpers/contractAddress';
import sunmaitCrowdsaleContract from '../../../smart-contracts-abis/SunmaitCrowdsale';
import sunmaitTokenContract from '../../../smart-contracts-abis/SunmaitToken'

export const getContractsAbi = () => (dispatch, getState) => {
  const localWeb3 = getState().metaMask.localWeb3;
  const tokenContract = new localWeb3.eth.Contract(sunmaitTokenContract.abi, contractAddresses.sunmaitToken);
  const crowdsaleContract = new localWeb3.eth.Contract(sunmaitCrowdsaleContract.abi, contractAddresses.sunmaitCrowdsale);

  const payload = {
    tokenContract,
    crowdsaleContract
  }

  dispatch({
    type: CONSTANTS.GET_CONTRACTS_ABI,
    payload
  });
};