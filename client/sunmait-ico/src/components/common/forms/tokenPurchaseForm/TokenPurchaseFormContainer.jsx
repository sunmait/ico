import { compose } from 'redux';
import { reduxForm, formValueSelector, reset } from 'redux-form'
import { connect } from 'react-redux';
import MODALS from '../../../../constants/modal';
import tokenPurchaseForm from './TokenPurchaseForm';
import modalDecorator from '../../modalDecorator/modalDecorator';
import { purchaseTokens } from '../../../../redux/modules/crowdsale/crowdsaleActions';

const selector = formValueSelector('tokenPurchase');
const resetForm = () => reset('tokenPurchase');

const MapStateToProps = state => ({
  formValues: selector(state, 'tokens', 'eth'),
  ethPrice: state.metaMask.ethPrice
});

const mapDispatchToProps = {
  purchaseTokens,
  resetForm
};

const TokenPurchaseFormContainer = compose(
  modalDecorator({name: MODALS.TOKEN_PURCHASE_FORM}),
  connect(MapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'tokenPurchase'}),
)(tokenPurchaseForm);

export default TokenPurchaseFormContainer;