import React, { useState, useEffect } from 'react';
import './Form.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { saveConfig } from '../../actions';

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

const inputGorClasses = {
  mods: {
    direction: 'row'
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

const defaultConfig = {
  id: '',
  repoName: '',
  mainBranch: '',
  buildCommand: '',
  period: 10
}

const Form = (props) => {
  const [config, setConfig] = useState(defaultConfig);
  const [state, setState] = useState(props);

  useEffect(() => {
    if (Object.keys(props.config).length) {
      setConfig(props.config);
    }
  }, [props.config]);

  const onChangeHandler = (event) => {
    event.persist();
    setConfig((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  }

  const onSubminHandler = (event) => {
    event.persist();
    props.saveConfig(config);
    setState((prevState) => ({...prevState, ...{ isDisabled: !state.isDisabled }}))
  }

  const clearInput = (event) => {
    event.persist();
    const target = event.target.offsetParent.getElementsByTagName('input')[0].name;
    setConfig((prevState) => ({...prevState, ...{ [target]: '' }}));
  }

  return (
    <form className="Form Content-Form" onSubmit={onSubminHandler}>
      <div className="Form-Info">
        <h2 className="Form-Title">Settings</h2>
        <p className="Form-Text">Configure repository connection and&#160;synchronization settings.</p>
      </div>
      <div className="Form-Field">
        <Input classes={inputReqClasses} required={true}>
          <label htmlFor="repoName" className="Input-Label">GitHub repository</label>
          <input 
            type="text" 
            name="repoName" id="repoName" 
            className="Input-Input Input-Input_border_default" 
            placeholder="user-name/repo-name" 
            value={config.repoName}
            onChange={onChangeHandler}
            required
          />
          { config.repoName && <span className="Input-Icon Icon Icon_inputClear" onClick={clearInput}></span> }
        </Input>
      </div>
      <div className="Form-Field">
        <Input classes={inputReqClasses} required={true}>
          <label htmlFor="buildCommand" className="Input-Label">Build command</label>
          <input 
            type="text" 
            name="buildCommand" 
            id="buildCommand" 
            className="Input-Input Input-Input_border_default" 
            placeholder="my command for build" 
            value={config.buildCommand} 
            onChange={onChangeHandler}
            required
          />
          { config.buildCommand && <span className="Input-Icon Icon Icon_inputClear" onClick={clearInput}></span> }
        </Input>
      </div>
      <div className="Form-Field">
        <Input classes={inputClasses} required={true}>
          <label htmlFor="mainBranch" className="Input-Label">Main branch</label>
          <input 
            type="text" 
            name="mainBranch" 
            id="mainBranch" 
            className="Input-Input Input-Input_border_default" 
            placeholder="name of branch" 
            value={config.mainBranch}
            onChange={onChangeHandler}
          />
          { config.mainBranch && <span className="Input-Icon Icon Icon_inputClear" onClick={clearInput}></span> }
        </Input>
      </div>
      <div className="Form-Field">
        <Input className="Content-Form-Input" classes={inputGorClasses}>
          <label htmlFor="period" className="Input-Label">Synchronize every</label>
          <input 
            type="text" 
            pattern="^[ 0-9]+$"
            name="period" 
            id="period" 
            className="Input-Input Input-Input_border_default Content-Form-Input_small" 
            value={config.period} 
            onChange={onChangeHandler}
          />
          <div className="Input-Text">minutes</div>
        </Input>
      </div>
      <div className="Form-Field Content-Form-Field">
        <Button 
          type='submit' 
          classes={saveButtonClasses} 
          text='Save'
          isDisabled={state.isDisabled}
        />
        <Button 
          classes={settingsButtonClasses} 
          text='Cancel' 
          isDisabled={state.isDisabled}
        />
      </div>
    </form>
  )
}

Form.defaultProps = {
  isDisabled: false
}

const mapStateToProps = (state) => ({
  config: state.config,
  configSaveRes: state.configSaveRes
})

const mapDispatchToProps = (dispatch) => ({
  saveConfig: (data) => dispatch(saveConfig(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);
