import React, { Fragment } from 'react';
import { expandClasses } from '../../utils';

export interface InputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  classes: Classes;
  className?: string;
  value?: string | number;
  isIcon?: boolean;
  onClearInput?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
  required?: boolean;
  pattern?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, name, placeholder, onChange, classes, className, value, isIcon, onClearInput, required, pattern }) => {

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
        className={ expandClasses(classes, 'Input', 'Input', 'Input-Input', className || '') }
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
