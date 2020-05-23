import React from 'react';
import './FormField.scss';

export interface FormFieldProps {
  className?: string;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = (props) => {

  return (
    <div className={ props.className }>
      { props.children }
    </div>
  );
};

export default React.memo(FormField);
