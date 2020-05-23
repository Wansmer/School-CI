import React from 'react';

export interface LabelProps {
  htmlFor?: string;
  className: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className }) => {
  return (
    <label htmlFor={ htmlFor } className={ className }>
      { children }
    </label>
  );
};

export default React.memo(Label);
