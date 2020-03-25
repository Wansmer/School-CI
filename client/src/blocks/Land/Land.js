import React from "react";
import {Link} from 'react-router-dom';
import "./Land.scss";
import Button from '../Button/Button';

const actionButtonClasses = {
  mods: { 
    type: 'action', 
    size: 'l'
  }
}

function Land(props) {
  return (
    <div className="Land">
      <div className="Land-Logo"></div>
      <p className="Land-Text">
        Configure repository connection and&#160;synchronization settings
      </p>
      <Link to={props.pathTo}>
        <Button className="Land-Button" 
                text="Open settings"
                classes={actionButtonClasses}
                />
      </Link>
    </div>
  );
}

Land.defaultProps = {
  pathTo: '/settings'
}

export default Land;
