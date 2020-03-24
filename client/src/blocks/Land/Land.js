import React from "react";
import {Link} from 'react-router-dom';
import "./Land.scss";
import Button from '../Button/Button';

function Land(props) {
  return (
    <div class="Land">
      <div class="Land-Logo"></div>
      <p class="Land-Text">
        Configure repository connection and&#160;synchronization settings
      </p>
      <Link to={props.pathTo}>
        <Button className="Land-Button" mods={{ type: 'action', size: 'l' }} text="Open settings"/>
      </Link>
    </div>
  );
}

Land.defaultProps = {
  pathTo: '/settings'
}

export default Land;
