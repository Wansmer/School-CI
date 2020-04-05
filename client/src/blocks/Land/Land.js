import React from "react";
import { useHistory } from 'react-router-dom';
import "./Land.scss";
import Button from '../Button/Button';

const actionButtonClasses = {
  mods: { 
    type: 'action', 
    size: 'l'
  }
}

const Land = React.memo(() => {

  const history = useHistory();

  const clickHandler = (event) => {
    event.preventDefault();
    history.push('/settings');
  }

  return (
    <div className="Land">
      <div className="Land-Logo"></div>
      <p className="Land-Text">
        Configure repository connection and&#160;synchronization settings
      </p>
      <Button 
        className="Land-Button" 
        text="Open settings"
        classes={actionButtonClasses}
        onClick={clickHandler}
      />
    </div>
  );
});

export default Land;
