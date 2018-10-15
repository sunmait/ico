import Web3 from 'web3';
import store from '../redux/store';
import { setWeb3Provider } from '../redux/modules/metaMask/metaMaskActions';
import { NotificationManager } from 'react-notifications';

const web3Initialization = () => {
  return new Promise((resolve, reject) => {
    if (typeof web3 !== 'undefined') {
      const localWeb3 = new Web3(window.web3.currentProvider);
  
      if (localWeb3.currentProvider.isMetaMask) {
        localWeb3.eth.getAccounts((error, accounts) => {
          if (accounts.length === 0) {
            NotificationManager.warning('There are no active accounts in MetaMask.', 'Metamask warning', 10000);
            reject();
          }
          else {
            localWeb3.eth.defaultAccount = accounts[0];
            resolve(localWeb3);
          }
        });
      } else {
        NotificationManager.warning('Different web3 provider. Please use Metamask.', 'Metamask warning', 10000);
        reject();
      }
    } else {
      NotificationManager.warning('No web3 provider. Please use Metamask.', 'Metamask warning', 10000);
      reject();
    }
  });
};

export default web3Initialization;