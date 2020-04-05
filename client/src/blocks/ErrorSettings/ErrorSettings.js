import React from 'react';
import './ErrorSettings.scss';

const ErrorSettings = (props) => {
  return (
    <div className='Error' onClick={props.onClick}>
      <span>Error: { props.errorText || 'This is a text of this error...' }</span>
    </div>
  )
}

export default ErrorSettings;
