import React from 'react';
import './Form.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const inputReqClasses = {
  mods: { 
    direction: 'column',
    required: ''
  }, 
  elems: {
    Input: {
      mods: {
        border: 'default'
      }
    }
  }
}

const inputGorClasses = {
  mods: {
    direction: 'row'
  }
}

const saveButtonClasses = {
  mods: {
    type: 'action',
    size: 'm'
  }
}

const settingsButtonClasses = {
  mods: {
    type: 'control',
    size: 'm'
  }
}

function Form(props) {
  return (
    <form action="" className="Form Content-Form">
      <div className="Form-Info">
        <h2 className="Form-Title">Settings</h2>
        <p className="Form-Text">Configure repository connection and&#160;synchronization settings.</p>
      </div>
      <div className="Form-Field">
        <Input classes={inputReqClasses} required={true}>
          <label htmlFor="repoName" className="Input-Label">GitHub repository</label>
          <input type="text" name="repoName" id="repoName" className="Input-Input Input-Input_border_default" placeholder="user-name/repo-name"/>
        </Input>
      </div>
      <div className="Form-Field">
        <Input classes={inputReqClasses} required={true}>
          <label htmlFor="buildCommand" className="Input-Label">Build command</label>
          <input type="text" name="buildCommand" id="buildCommand" className="Input-Input Input-Input_border_default" placeholder="my command for build"/>
        </Input>
      </div>
      <div className="Form-Field">
        <Input classes={inputReqClasses} required={true}>
          <label htmlFor="buildCommand" className="Input-Label">Main branch</label>
          <input type="text" name="buildCommand" id="buildCommand" className="Input-Input Input-Input_border_default" placeholder="name of branch"/>
        </Input>
      </div>
      <div className="Form-Field">
        <Input className="Content-Form-Input" classes={inputGorClasses}>
          <label htmlFor="period" className="Input-Label">Synchronize every</label>
            <input type="text" name="period" id="period" className="Input-Input Input-Input_border_default Content-Form-Input_small"/>
            <div className="Input-Text">minutes</div>
        </Input>
      </div>
      <div className="Form-Field Content-Form-Field">
        <Button classes={saveButtonClasses} text='Save' />
        <Button classes={settingsButtonClasses} text='Cancel' />
      </div>
    </form>
  )
}

export default Form;
