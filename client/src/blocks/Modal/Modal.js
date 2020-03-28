import React from 'react';
import { connect } from 'react-redux';
import './Modal.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const inputClasses = {
  mods: {
    direction: 'column'
  },
  elems: {
    Input: {
      mods: {
        border: 'default'
      }
    }
  }
}

const saveButtonClasses = {
  mods: {
    type: 'action',
    size: 'l'
  }
}

const settingsButtonClasses = {
  mods: {
    type: 'control',
    size: 'l'
  }
}

const Modal = (props) => {
  return (
    <div className='Modal'>
      <div className='Modal-Overlay'>
        <div className='Modal-Body'>
          <form>
            <div className="Modal-Info">
              <h2 className="Modal-Title">New build</h2>
              <p className="Modal-Text">Enter the commit hash which you want to build.</p>
            </div>
            <Input className={inputClasses}>
              <input className='Input-Input Input-Input_border_default' placeholder='Commit hash' />
              <span class="Input-Icon Icon Icon_inputClear"></span>
            </Input>
            <div className='Modal-ButtonsGroup'>
              <Button type='submit' classes={saveButtonClasses} text='Run build' />
              <Button classes={settingsButtonClasses} className='Modal-Button Modal-Button_type_control' text='Cancel' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default connect()(Modal);
