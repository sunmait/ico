import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePageComponent from './HomePageComponent';
import { getCrowdsaleDetails, getUserBalance } from '../../redux/modules/crowdsale/crowdsaleActions';
import { toggleModal } from '../../redux/modules/modal/modalAction';

const mapStateToProps = (state) => ({
  crowdsaleDetails: state.crowdsale.crowdsaleDetails,
  userBalance: state.crowdsale.userBalance
});

const mapDispatchToProps = {
  getCrowdsaleDetails,
  getUserBalance,
  toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);