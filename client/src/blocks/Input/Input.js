import React from 'react';
import './Input.scss';

import { expandClasses } from '../../utils';


function Input(props) {
  return (
    <div className={expandClasses(props.classes, 'Input')}>
      <label htmlFor={props.labelFor}
        className={'Input-Label ' +
          expandClasses(props.classes, 'Input', 'Label')
        }>
        {props.labelText}
      </label>
      <input type="text" name="repo" id="repo_id" className="Input-Input Input-Input_border_default" placeholder="user-name/repo-name" required />
      {/* <span className="Input-Icon Icon Icon_inputClear"></span> */}
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
