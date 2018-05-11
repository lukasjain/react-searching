import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Table = function (props) {
    const { list, onDismiss } = props;
    return (
       <div className="table">
         {
           list.map(item =>
             <div key={item.objectID} className="table-row">
               <span>
                 <a href={item.url}>{item.title}</a>
               </span>
               <span>{item.author}</span>
               <span>{item.num_comments}</span>
               <span>{item.points}</span>
               <span>
                 <Button
                   onClick={() => onDismiss(item.objectID)} className="button-inline"
                     > Dismiss
                 </Button>
               </span>
             </div>
             )
          }
       </div>
    );
 }

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Table;
