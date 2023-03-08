import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={css.Button} type="button">
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
