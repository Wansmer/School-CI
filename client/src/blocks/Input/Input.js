import React, { Fragment } from 'react';
import { expandClasses } from '../../utils';

const Input = ({ id, name, placeholder, onChange, classes, className, value, isIcon, onClearInput, required, pattern }) => {

  return (
    <Fragment>
      <input
        id={ id }
        name={ name }
        placeholder={ placeholder }
        onChange={ onChange }
        required={ required }
        value={ value }
        pattern={ pattern }
        className={ expandClasses(classes, 'Input', 'Input', 'Input-Input', className) }
      />
      { (isIcon && value !== '') && <span className="Input-Icon Icon Icon_inputClear" onClick={ onClearInput }></span> }
    </Fragment>
  );
};

Input.defaultProps = {
  type: 'text',
  isIcon: true
};

export default React.memo(Input);
