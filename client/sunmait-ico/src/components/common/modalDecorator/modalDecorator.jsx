import { connect } from 'react-redux';
import { toggleModal } from '../../../redux/modules/modal/modalAction';

const modalDecorator = ({ name }) => {
  const mapStateToProps = state => {
    if (state.modal.hasOwnProperty(name)) {
      const { isOpen } = state.modal[name];

      return {
        isOpen
      };
    }
    return {
      isOpen: false
    };
  };

  const mapDispatchToProps = {
    toggleModal
  };

  return WrappedComponent => {
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(WrappedComponent);
  };
};

export default modalDecorator;