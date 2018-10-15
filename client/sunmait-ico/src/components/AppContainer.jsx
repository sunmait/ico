import React from 'react';
import { connect } from 'react-redux';
import { getEthPrice, setWeb3Provider } from '../redux/modules/metaMask/metaMaskActions';
import { getContractsAbi } from '../redux/modules/contracts/contractsActions';
import App from './App';

const mapStateToProps = state => ({
  providerConnected: state.metaMask.providerConnected,
  contractsLoaded: state.contracts.contractsLoaded,
});

const mapDispatchToProps = {
  getEthPrice,
  setWeb3Provider,
  getContractsAbi,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);