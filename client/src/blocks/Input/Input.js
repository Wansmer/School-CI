import React, { Fragment, useState } from 'react';
import { expandClasses } from '../../utils';

const Input = React.memo((props) => {
  return (
    <Fragment>
      <input {...props} onChange={ props.onChange } classes='' className={ expandClasses(props.classes, 'Input', 'Input', 'Input-Input', props.className) } />
      { (props.icon && props.value !== '') && <span className="Input-Icon Icon Icon_inputClear" onClick={props.clearInput}></span> }
    </Fragment>
  )
});

Input.defaultProps = {
  type: 'text',
  icon: true
}

export default Input;
