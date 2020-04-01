import React from 'react';
import './Error.scss';

export default Error = (props) => {
  return (
    <div className='Error' onClick={props.onClick}>
      Error: { props.errorText || 'This is a text of this error...' }
    </div>
  )
}
