import React from 'react';
import MODALS from '../../../../constants/modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Field } from 'redux-form'
import TextFieldInput from '../../inputs/textFieldInput';

const tokenPurchaseForm = ({ isOpen, formValues, ethPrice, toggleModal, purchaseTokens, resetForm }) => {
  const handleCancel = () => {
    resetForm();
    toggleModal(MODALS.TOKEN_PURCHASE_FORM);
  };

  const handleSubmit = async () => {
    await purchaseTokens(formValues.tokens);
    resetForm();
    toggleModal(MODALS.TOKEN_PURCHASE_FORM);
  };

  const getPriceInUSD = () => (
    formValues.eth ? formValues.eth * ethPrice.USD : 0
  );
  
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" disableTypography={true}>
        <Typography variant="h6">Purchase tokens</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="subtitle1">
          Please choose the amount of tokens you wish to purchase.
        </DialogContentText>
        <form>
          <div>
            <Field name="tokens" label="amount of tokens" component={TextFieldInput} type="text" />
          </div>
          <div>
            <Field
              name="eth"
              label="price in ETH"
              helperText={`Price in USD: ${getPriceInUSD()}`}
              component={TextFieldInput} type="text"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
            </Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default tokenPurchaseForm;