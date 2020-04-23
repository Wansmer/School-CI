import React from 'react';
import './InputGroup.scss';
import { expandClasses } from '../../utils';
import Label from '../Label/Label';
import Input from '../Input/Input';

export interface InputGroupProps {
  classes: Classes;
  className: string;
  label: string;
  describe: string;
  id: string;
  name: string;
  placeholder: string;
  onChange(): void;
  value: string;
  isIcon: boolean;
  onClearInput(): void;
  required: boolean;
  pattern: string;
  type: string;
}

const InputGroup: React.FC<InputGroupProps> = (props) => {
  return (
    <div className={expandClasses(props.classes, 'Input', '', props.className || '')}>
      { props.label && <Label htmlFor={props.id} className="Input-Label" >{ props.label }</Label> }
      <Input {...props} />
      { props.describe && <div className="Input-Text">{ props.describe }</div> }
    </div>
  );
};

InputGroup.defaultProps = {
  classes: {
    mods: {
      direction: 'column'
    }
  }
};

export default React.memo(InputGroup);
