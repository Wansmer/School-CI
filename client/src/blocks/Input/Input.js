import React from 'react';
import './Input.scss';

import { expandClasses } from '../../utils';


function Input(props) {
  return (
    <div className={expandClasses(props.classes, 'Input', '', props.className)}>
      {props.children}
    </div>
  )
}

Input.defaultProps = {
  classes: {
    mods: {
      direction: 'column'
    }
  }
}

export default Input;
