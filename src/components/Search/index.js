import React from 'react';

const Search = (props) => {
      const {value, onChange, onSubmit, children} = props;
      return (

              <form onSubmit={onSubmit}>
                 <input
                   type="text"
                   value={value}
                   onChange={onChange}
                  />
                  <button type="submit">
                   {children}
                   </button>
              </form>
            );
}

export default  Search;
