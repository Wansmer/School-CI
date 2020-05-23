import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Form.scss';
import { saveConfig, cleanSaveCode } from '../../redux/actions';
import InputGroup from '../InputGroup/InputGroup';
import FormField from '../FormField/FormField';
import Button from '../Button/Button';
import ErrorSettings from '../ErrorSettings/ErrorSettings';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

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
  periodLabel?: string;
  periodDescribe?: string;
  saveConfig(config: ConfigurationModel): void;
  cleanSaveCode(): void;
  isErrorModal?: boolean;
}

const Form: React.FC<FormProps> = (props) => {
  const [config, setConfig] = useState(defaultConfig);
  const [state, setState] = useState(props);
  const history = useHistory();

  useEffect(() => {
    const wrapper = config.period;
    const { periodLabel, periodDescribe } = getCurrentPeriodLang(wrapper);
    setState((prevState) => ({...prevState, ...{ periodLabel: periodLabel, periodDescribe: periodDescribe }}));
  }, [i18next.language]);

  useEffect(() => {
    if (Object.keys(props.config).length) {
      setConfig(props.config);
    }
  }, [props.config]);

  const { t } = useTranslation();

  const getCurrentPeriodLang = (period: any) => {
    const wrapper = period ? period : '0';
    const tmp = t('settings.sync', { count: Number(wrapper) }).split(wrapper);
  
    const periodLabel = tmp[0].trim();
    const periodDescribe = tmp[1].trim();

    return { periodLabel, periodDescribe };
  }

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
    setConfig((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  };

  const changePeriodHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (isNaN(Number(event.target.value))) return;

    const wrapper = event.target.value ? event.target.value : '0';

    const { periodLabel, periodDescribe } = getCurrentPeriodLang(wrapper);

    setState((prevState) => ({...prevState, ...{ periodLabel: periodLabel, periodDescribe: periodDescribe }}));
    setConfig((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  }

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
        <h2 className="Form-Title">{ t('settings.formName') }</h2>
        <p className="Form-Text">
          { t('settings.formDescribe') }
        </p>
      </div>
      <FormField className="Form-Field">
        <InputGroup
          classes={ inputReqClasses }
          id="repoName"
          label={ t('settings.repoInputName') }
          name="repoName"
          placeholder={ t('settings.repoInputPlaceholder') }
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
          label={ t('settings.cmdInputName') }
          name="buildCommand"
          placeholder={ t('settings.cmdInputPlaceholder') }
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
          label={ t('settings.branchInputName') }
          name="mainBranch"
          placeholder={ t('settings.branchInputPlaceholder') }
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
          label={ state.periodLabel }
          name="period"
          placeholder="10"
          value={ config.period }
          onChange={ changePeriodHandler }
          onClearInput={ clearInput }
          pattern="^[0-9]+$"
          isIcon={ false }
          describe={ state.periodDescribe }
        />
      </FormField>
      <div className="Form-Field Content-Form-Field">
        <Button
          type='submit'
          classes={saveButtonClasses}
          text={ t('buttons.save') }
          isDisabled={state.isDisabled}
        />
        <Button
          classes={settingsButtonClasses}
          text={ t('buttons.cancel') }
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
  isShowError: false,
  periodLabel: 'Syncronize every',
  periodDescribe: 'minutes'
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
