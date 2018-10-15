import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from './home/HomePageContainer';

function WrappedContainer(Component) {
  let Wrapper = (props) => {
    const {providerConnected, contractsLoaded} = props;
    if (providerConnected && contractsLoaded) {
      return <Component />
    }
  
    return <div>null</div>
  }
  
  const mapStateToProps = (state) => ({
    providerConnected: state.metaMask.providerConnected,
    contractsLoaded: state.contracts.contractsLoaded,
  });

  Wrapper = connect(mapStateToProps)(Wrapper);

  return Wrapper;
}

class App extends Component {
  componentDidMount() {
    this.loadMetaMask();
  }

  loadMetaMask = async () => {
    await this.props.setWeb3Provider();
    this.props.getContractsAbi();
    this.props.getEthPrice();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={WrappedContainer(HomePageContainer)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
