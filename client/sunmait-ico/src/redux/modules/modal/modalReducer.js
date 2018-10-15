import CONSTANTS from './modalConstants';
import MODALS from '../../../constants/modal';

const defaultState = {
  [MODALS.TOKEN_PURCHASE_FORM]: {
    isOpen: false
  }
};

const handleToggleModal = (state, modalName) => {
  const toggledModal = state[modalName];
  toggledModal.isOpen = !toggledModal.isOpen;

  return {
    ...state,
    [modalName]: toggledModal
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONSTANTS.TOGGLE_MODAl:
      return handleToggleModal(state, action.payload);

    default:
      return state;
  };
};