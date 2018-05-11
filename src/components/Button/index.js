import React from 'react';
import PropTypes from 'prop-types';

const Button = function (props){
   const { onClick, children } = props;
   return (
           <button onClick={ onClick } type="button">
            { children }
           </button>
          );
 }

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
};


export default Button;
