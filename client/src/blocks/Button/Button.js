import React from 'react';
import './Button.scss';
import {expandClasses} from '../../utils';


function Button(props) {
  const { isDisabled, className, classes, onClick, text } = {...props};
  return (
    <button 
      onClick={onClick} 
      className={expandClasses(classes, 'Button', '', className)}
      disabled={isDisabled}
    >
      <span className="Button-Text">{text}</span>
    </button>
  )
}

Button.defaultProps = {
  text: 'Button'
}

export default Button;
