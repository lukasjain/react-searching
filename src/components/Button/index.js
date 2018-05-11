import React from 'react';

const Button = function (props){
   const { onClick, children } = props;
   return (
           <button onClick={ onClick } type="button">
            { children }
           </button>
          );
 }


export default Button;
