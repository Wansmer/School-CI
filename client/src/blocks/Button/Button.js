import React from 'react';
import './Button.scss';
import {expandClasses} from '../../utils';


function Button(props) {

  return (
    <button className={props.className + ' ' + 'Button ' + expandClasses(props.classes, 'Button')}>
      <span className="Button-Text">{props.text}</span>
    </button>
  )
}

Button.defaultProps = {
  text: 'Button'
}

export default Button;
