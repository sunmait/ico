import React from 'react';
import { connect } from 'react-redux';s
import MODALS from '../../../../constants/modal';
import modalDecorator from '../../modalDecorator/modalDecorator';
import { buyTokens } from '../../../../redux/modules/crowdsale/crowdsaleActions';

const MapStateToProps = state => ({

});

const mapDispatchToProps = {
  buyTokens
}

const TokenPurchaseFormContainer = connect(MapStateToProps, mapDispatchToProps)(tokenPurchaseForm)

export default modalDecorator({name: MODALS.TOKEN_PURCHASE_FORM})(TokenPurchaseFormContainer);