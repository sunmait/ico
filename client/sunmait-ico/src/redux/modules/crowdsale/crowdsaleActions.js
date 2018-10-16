
import CONSTANTS from './crowdsaleConstants';
import dateFns from 'date-fns';
import contractAddresses from '../../../helpers/contractAddress';

export const getCrowdsaleDetails = () => async (dispatch, getState) => {
  const { localWeb3 } = getState().metaMask;
  const { crowdsaleContract, tokenContract } = getState().contracts;
  
  const status = await crowdsaleContract.methods.getCurrentState().call();
  const startDate = await crowdsaleContract.methods.phase1OpeningTime().call();
  const endDate = await crowdsaleContract.methods.phase2ClosingTime().call();
  const phase1EndDate = await crowdsaleContract.methods.phase1ClosingTime().call();
  
  const phase1TokenPrice = await crowdsaleContract.methods.PHASE1_RATE().call();
  const phase2TokenPrice = await crowdsaleContract.methods.PHASE2_RATE().call();

  const rawTotalTokenAmount = await tokenContract.methods.totalSupply().call();
  const rawTotalTokenRaised = await tokenContract.methods.balanceOf(contractAddresses.sunmaitCrowdsale).call();
  const rawTotalRaised = await crowdsaleContract.methods.totalRaised().call();
  const rawPhase1Raised = await crowdsaleContract.methods.phase1weiRaised().call();
  const rawPhase2Raised = await crowdsaleContract.methods.phase2weiRaised().call();
  const totalTokenAmount = parseFloat(await localWeb3.utils.fromWei(rawTotalTokenAmount, 'ether')).toFixed(3);
  const totalTokenRaised = parseFloat(await localWeb3.utils.fromWei(rawTotalTokenRaised, 'ether')).toFixed(3);
  const totalRaised = parseFloat(await localWeb3.utils.fromWei(rawTotalRaised, 'ether')).toFixed(3);
  const phase1Raised = parseFloat(await localWeb3.utils.fromWei(rawPhase1Raised, 'ether')).toFixed(3);
  const phase2Raised = parseFloat(await localWeb3.utils.fromWei(rawPhase2Raised, 'ether')).toFixed(3);

  const currentTokenPrice = status == 1 ? phase1TokenPrice : phase2TokenPrice;

  const payload = {
    status,
    startDate: dateFns.format(startDate * 1000, 'DD/MM/YYYY'),
    phase1EndDate: dateFns.format(phase1EndDate * 1000, 'DD/MM/YYYY'),
    endDate: dateFns.format(endDate * 1000, 'DD/MM/YYYY'),
    phase1TokenPrice,
    phase2TokenPrice,
    currentTokenPrice,
    totalTokenAmount,
    totalTokenRaised,
    totalRaised,
    phase1Raised,
    phase2Raised
  }
  
  dispatch({
    type: CONSTANTS.GET_CROWDSALE_DETAILS,
    payload,
  });
};

export const getUserBalance = () => async (dispatch, getState) => {
  const { currentAccount, localWeb3 } = getState().metaMask;
  const { tokenContract } = getState().contracts;

  const rawTokens = await tokenContract.methods.balanceOf(currentAccount).call();
  const payload = parseFloat(await localWeb3.utils.fromWei(rawTokens, 'ether')).toFixed(3);

  dispatch({
    type: CONSTANTS.GET_USER_BALANCE,
    payload
  });
};

export const purchaseTokens = (tokenAmount) => async (dispatch, getState) => {
  const { currentAccount, localWeb3 } = getState().metaMask;
  const { currentTokenPrice } = getState().crowdsale.crowdsaleDetails;
  const eth = parseFloat(tokenAmount / currentTokenPrice).toString(10);

  await localWeb3.eth.sendTransaction({ from: currentAccount, to: contractAddresses.sunmaitCrowdsale, value: localWeb3.utils.toWei(eth)});

  dispatch({
    type: CONSTANTS.ADD_TOKENS_TO_BALANCE,
    payload: tokenAmount,
  });
}