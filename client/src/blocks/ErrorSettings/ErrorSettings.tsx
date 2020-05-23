import React from 'react';
import './ErrorSettings.scss';

export interface ErrorProps {
  onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  errorText: string;
}

const ErrorSettings: React.FC<ErrorProps> = (props) => {
  return (
    <div className='Error' onClick={props.onClick}>
      <span>Error: {props.errorText || 'This is a text of this error...'}</span>
    </div>
  );
};

export default React.memo(ErrorSettings);
