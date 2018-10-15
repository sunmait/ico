import React from 'react';
import MODALS from '../../../../constants/modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import modalDecorator from '../../modalDecorator/modalDecorator';

const tokenPurchaseForm = ({ isOpen, toggleModal }) => {
  const handleClose = () => {
    toggleModal(MODALS.TOKEN_PURCHASE_FORM);
  }
  
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Purchase tokens</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please choose the amount of tokens you wish to purchase.
        </DialogContentText>
        TO_DO_FORM
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
            </Button>
        <Button onClick={handleClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default modalDecorator({name: MODALS.TOKEN_PURCHASE_FORM})(tokenPurchaseForm);