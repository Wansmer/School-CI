import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Form.scss';
import { saveConfig, cleanSaveCode } from '../../redux/actions';
import InputGroup from '../InputGroup/InputGroup';
import FormField from '../FormField/FormField';
import Button from '../Button/Button';
import ErrorSettings from '../ErrorSettings/ErrorSettings';

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
};

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
};

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
};

const saveButtonClasses = {
  mods: {
    type: 'action',
    size: 'l'
  }
};

const settingsButtonClasses = {
  mods: {
    type: 'control',
    size: 'l'
  }
};

const defaultConfig = {
  id: '',
  repoName: '',
  mainBranch: '',
  buildCommand: '',
  period: 10
};

export interface FormProps {
  isDisabled?: boolean;
  isShowError?: boolean;
  config?: any;
  configSaveRes?: any;
  saveConfig(config: ConfigurationModel): void;
  cleanSaveCode(): void;
  isErrorModal?: boolean;
}

const Form: React.FC<FormProps> = (props) => {
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
  }, [props.configSaveRes]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    console.dir('name', event);
    console.dir('value', event.target.value);
    console.log(config.repoName);
    setConfig((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  };

  const onSubminHandler = (event: any) => {
    event.preventDefault();
    if (config.repoName.trim() && config.buildCommand.trim()) {
      props.saveConfig(config);
      setState((prevState) => ({...prevState, ...{ isDisabled: !state.isDisabled }}));
    }
  };

  const goToHome = (event: any) => {
    event.preventDefault();
    history.push('/');
  };

  const toggleErrorShow = (event: any) => {
    console.log('Toggle error show...');
    event.persist();
    setState((prevState) => ({...prevState, ...{ isErrorModal: !state.isErrorModal }}));
  };

  const clearInput = (event: any) => {
    event.persist();
    const target = event.target.offsetParent.getElementsByTagName('input')[0].name;
    setConfig((prevState) => ({...prevState, ...{ [target]: '' }}));
  };

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
          pattern="^[\w-]+\/[\w-]+$"
          required
          onClearInput={ clearInput }
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
          onClearInput={ clearInput }
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
          onClearInput={ clearInput }
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
          onClearInput={ clearInput }
          pattern="^[0-9]+$"
          isIcon={ false }
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
        { state.isShowError && <ErrorSettings onClick={toggleErrorShow} errorText={state.configSaveRes.stderr} /> }
      </div>
    </form>
  );
};

Form.defaultProps = {
  isDisabled: false,
  isShowError: false
};

const mapStateToProps = (state: State) => ({
  config: state.settings.config,
  configSaveRes: state.settings.configSaveRes
});

const mapDispatchToProps = (dispatch: Function) => ({
  saveConfig: (data: ConfigurationModel) => dispatch(saveConfig(data)),
  cleanSaveCode: () => dispatch(cleanSaveCode())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
