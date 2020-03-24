import React, { useState } from 'react';
import './Button.scss';
// "Button Button_icon_left Icon_gear Button_size_m Button_type_control Button_icon Header-Button"

const initialState = {
  className: 'Button',
  mods: {
    type: 'control',
    size: 'm',
  },
  icon: {
    submitted: false,
    pos: '',
    pic: ''
  },
  text: 'Button'
}

function Button(props) {
  const [state, setState] = useState(initialState);
  console.log(props);
  return (
    <button className={'Button' + 
                      ' Button_type_' + props.type + 
                      ' Button_size_' + props.size
                      }>
      <span className="Button-Text">{props.text}</span>
    </button>
  )
}

export default Button;
