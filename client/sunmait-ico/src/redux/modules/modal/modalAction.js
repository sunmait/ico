import CONSTANTS from './modalConstants';

export const toggleModal = (modalName) => dispatch => {
  dispatch({ type: CONSTANTS.TOGGLE_MODAl, payload: modalName });
};