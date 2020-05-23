import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Modal.scss';
import { addToQueue, cleanSaveCode } from '../../redux/actions';
import InputGroup from '../InputGroup/InputGroup';
import Button from '../Button/Button';
import ErrorSettings from '../ErrorSettings/ErrorSettings';

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

export interface ModalProps {
  buildRequestRes?: any;
  loading?: boolean;
  commitHash: string;
  isDisabled?: boolean;
  isShowError?: boolean;
  onClearInput(): void;
  onClose(event: any): void;
  isErrorModal?: boolean;
  addToQueue(data: string): void;
  [key: string]: any;
}

const Modal: React.FC<ModalProps> = (props) => {

  const [ data, setData ] = useState(props);
  const history = useHistory();

  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...{ buildRequestRes: props.buildRequestRes } }));
    if (props.buildRequestRes && props.buildRequestRes.code !== 200) {
      setData((prevState) => ({...prevState, ...{ isDisabled: false, isShowError: true }}));
    } else if (props.buildRequestRes && props.buildRequestRes.code === 200) {
      history.push(`/build/${props.buildRequestRes.id}`);
    }
  }, [props.buildRequestRes]);

  const toggleErrorShow = (event: any) => {
    console.log('Toggle error show...');
    event.persist();
    setData((prevState) => ({...prevState, ...{ isErrorModal: !data.isErrorModal }}));
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setData((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  };

  const onClose = (event: any) => {
    if (event.target === event.currentTarget) {
      props.onClose(event);
    }
  };

  const onSubminHandler = (event: any) => {
    event.preventDefault();
    if (data.commitHash.trim()) {
      setData((prevState) => ({...prevState, ...{ isDisabled: !data.isDisabled }}));
      props.addToQueue(data.commitHash);
    }
  };

  const clearInput = (event: any) => {
    event.persist();
    const target = event.target.offsetParent.getElementsByTagName('input')[0].name;
    setData((prevState) => ({...prevState, ...{ [target]: '' }}));
  };

  return (
    <div className='Modal'>
      <div className='Modal-Overlay' onClick={onClose} >
        <div className='Modal-Body'>
          <form onSubmit={onSubminHandler}>
            <div className="Modal-Info">
              <h2 className="Modal-Title">New build</h2>
              <p className="Modal-Text">Enter the commit hash which you want to build.</p>
            </div>
            <InputGroup
              classes={ inputClasses }
              id='commitHash'
              name='commitHash'
              placeholder='Commit hash'
              onChange={ onChangeHandler }
              onClearInput={ clearInput }
              value={ data.commitHash }
              minlength="7"
              required
            />
            <div className='Modal-ButtonsGroup'>
              <Button
                type='submit'
                classes={saveButtonClasses}
                text='Run build'
                isDisabled={data.isDisabled}
              />
              <Button
                classes={settingsButtonClasses}
                className='Modal-Button Modal-Button_type_control'
                text='Cancel'
                isDisabled={data.isDisabled}
                onClick={props.onClose}
              />
            </div>
            <div className="Form-Field">
              { data.isShowError && <ErrorSettings onClick={toggleErrorShow} errorText={data.buildRequestRes.stderr} /> }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  commitHash: '',
  isDisabled: false,
  isShowError: false
};

const mapStateToProps = (state: any) => ({
  buildRequestRes: state.ticket.buildRequestRes
});

const mapDispatchToProps = (dispatch: any) => ({
  addToQueue: (commitHash: string) => dispatch(addToQueue(commitHash)),
  cleanSaveCode: () => dispatch(cleanSaveCode())
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Modal));
