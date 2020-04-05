import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.scss';
import InputGroup from '../InputGroup/InputGroup';
import Button from '../Button/Button';
import Error from '../Error/Error';

import { connect } from 'react-redux';
import { saveConfig, cleanSaveCode } from '../../redux/actions';
import FormField from '../FormField/FormField';

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
  },
  elems: {
    Input: {
      mods: {
        border: 'default',
        small: ''
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
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(props.config).length) {
      setConfig(props.config);
    }
  }, [props.config]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, ...{ configSaveRes: props.configSaveRes } }));
    if (props.configSaveRes && props.configSaveRes.code !== 200) {
      setState((prevState) => ({...prevState, ...{ isDisabled: false, isShowError: true }}));
    } else if (props.configSaveRes && props.configSaveRes.code === 200) {
      props.cleanSaveCode();
      history.push('/history');
    }
  }, [props.configSaveRes])

  const onChangeHandler = (event) => {
    event.persist();
    console.dir('name', event);
    console.dir('value', event.target.value);
    console.log(config.repoName);
    setConfig((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  }

  const onSubminHandler = (event) => {
    event.preventDefault();
    props.saveConfig(config);
    setState((prevState) => ({...prevState, ...{ isDisabled: !state.isDisabled }}));
  }

  const goToHome = (event) => {
    event.preventDefault();
    history.push('/');
  }

  const toggleErrorShow = (event) => {
    console.log('Toggle error show...');
    event.persist();
    setState((prevState) => ({...prevState, ...{ isErrorModal: !state.isErrorModal }}));
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
      <FormField className="Form-Field">
        <InputGroup 
          classes={ inputReqClasses } 
          id="repoName" 
          label="GitHub repository" 
          name="repoName"
          placeholder="user-name/repo-name"
          value={config.repoName}
          onChange={onChangeHandler}
          required
          clearInput={ clearInput }
        />
      </FormField>
      <FormField className="Form-Field">
        <InputGroup 
          classes={ inputReqClasses } 
          id="buildCommand" 
          label="Build command" 
          name="buildCommand"
          placeholder="my command for build"
          value={config.buildCommand}
          onChange={onChangeHandler}
          required
          clearInput={ clearInput }
        />
      </FormField>
      <FormField className="Form-Field">
        <InputGroup 
          classes={ inputClasses } 
          id="mainBranch" 
          label="Main branch" 
          name="mainBranch"
          placeholder="name of branch"
          value={config.mainBranch}
          onChange={onChangeHandler}
          clearInput={ clearInput }
        />
      </FormField>
      <FormField className="Form-Field">
        <InputGroup 
          className="Content-Form-Input"
          classes={ inputGorClasses } 
          id="period" 
          label="Synchronize every" 
          name="period"
          placeholder="10"
          value={config.period}
          onChange={onChangeHandler}
          clearInput={ clearInput }
          pattern="^[ 0-9]+$"
          icon={ false }
          describe="minutes"
        />
      </FormField>
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
          onClick={goToHome}
        />
      </div>
      <div className="Form-Field">
        { state.isShowError && <Error onClick={toggleErrorShow} errorText={state.configSaveRes.stderr} /> }
      </div>
    </form>
  )
}

Form.defaultProps = {
  isDisabled: false,
  isShowError: false
}

const mapStateToProps = (state) => ({
  config: state.config,
  configSaveRes: state.configSaveRes
})

const mapDispatchToProps = (dispatch) => ({
  saveConfig: (data) => dispatch(saveConfig(data)),
  cleanSaveCode: () => dispatch(cleanSaveCode()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);
