import React from 'react';
import './Button.scss';

function Button(props) {
  return (
    <button className="Button Button_icon_left Icon_gear Button_size_m Button_type_control Button_icon Header-Button">
      <span className="Button-Text">Settings</span>
    </button>
  )
}

export default Button;
