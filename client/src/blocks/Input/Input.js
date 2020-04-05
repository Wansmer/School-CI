import React, { Fragment } from 'react';
import { expandClasses } from '../../utils';

const Input = React.memo((props) => {
  return (
    <Fragment>
      <input {...props} onChange={ props.onChange } classes='' className={ expandClasses(props.classes, 'Input', 'Input', 'Input-Input', props.className) } />
      { (props.isIcon && props.value !== '') && <span className="Input-Icon Icon Icon_inputClear" onClick={props.onClearInput}></span> }
    </Fragment>
  )
});

Input.defaultProps = {
  type: 'text',
  isIcon: true
}

export default Input;
