import React from 'react';
import './FormField.scss';

const FormField = (props) => {

  return (
    <div className={ props.className } id={props.id} >
      { props.children }
    </div>
  );
};

export default React.memo(FormField);
