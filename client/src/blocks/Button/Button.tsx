import React from 'react';
import './Button.scss';
import { expandClasses } from '../../utils';

export interface ButtonProps {
  isDisabled: boolean;
  className: string;
  classes: object;
  onClick(): void;
  text: string;
  id: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { isDisabled, className, classes, onClick, text, id } = { ...props };
  return (
    <button
      onClick={onClick}
      className={expandClasses(classes, 'Button', '', className)}
      disabled={isDisabled}
      id={id}
    >
      <span className="Button-Text">{text}</span>
    </button>
  );
};

Button.defaultProps = {
  text: 'Button'
};

export default React.memo(Button);
