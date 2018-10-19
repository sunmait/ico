import Web3 from 'web3';

const web3Initialization = () => {
  return new Promise((resolve, reject) => {
    if (typeof web3 !== 'undefined') {
      const localWeb3 = new Web3(window.web3.currentProvider);
  
      if (localWeb3.currentProvider.isMetaMask) {
        localWeb3.eth.getAccounts((error, accounts) => {
          if (accounts.length === 0) {
            reject('There are no active accounts in MetaMask.');
          }
          else {
            localWeb3.eth.defaultAccount = accounts[0];
            resolve(localWeb3);
          }
        });
      } else {
        reject('Different web3 provider. Please use Metamask.');
      }
    } else {
      reject('No web3 provider. Please use Metamask.');
    }
  });
};

export default web3Initialization;