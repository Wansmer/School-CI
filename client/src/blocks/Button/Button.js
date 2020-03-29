import React from 'react';
import './Button.scss';
import {expandClasses} from '../../utils';


function Button(props) {

  return (
    <button onClick={props.onClick || ''} className={expandClasses(props.classes, 'Button', '', props.className)}>
      <span className="Button-Text">{props.text}</span>
    </button>
  )
}

Button.defaultProps = {
  text: 'Button'
}

export default Button;
