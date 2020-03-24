import React, {useState} from 'react';
import './Button.scss';
// "Button Button_icon_left Icon_gear Button_size_m Button_type_control Button_icon Header-Button"

function Button(props) {
  // const [state, setState] = useState(initialState);

  return (
    <button className={props.mainClass + ' ' +
                       props.mainClass + '_type_' + props.mods.type + ' ' + 
                       props.mainClass + '_size_' + props.mods.size + ' ' +
                       props.className + ' ' +
                       (props.icon.submitted ? (`Button_icon Button_icon_${props.icon.pos} Icon_${props.icon.pic}`) : '')}>
      <span className="Button-Text">{props.text}</span>
    </button>
  )
}

Button.defaultProps = {
  mainClass: 'Button',
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

export default Button;
