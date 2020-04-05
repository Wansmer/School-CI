import React from 'react';

const Label = React.memo(({ children, htmlFor, className }) => {
  return (
    <label htmlFor={ htmlFor } className={ className }>
      { children }
    </label>
  )
});

export default Label;
