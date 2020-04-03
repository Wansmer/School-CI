import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Modal.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { addToQueue, cleanSaveCode } from '../../actions';
import { useHistory } from 'react-router-dom';

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
  
  const [ data, setData ] = useState(props);
  const history = useHistory();

  useEffect(() => {
    setData((prevState) => ({ ...prevState, ...{ buildRequestRes: props.buildRequestRes } }))
    if (props.buildRequestRes && props.buildRequestRes.id) {
      history.push(`/build/${props.buildRequestRes.id}`);
      props.cleanSaveCode();
    }
  }, [props.buildRequestRes])

  const onChangeHandler = (event) => {
    event.persist();
    setData((prevState) => ({...prevState, ...{ [event.target.name]: event.target.value }}));
  }

  const onClose = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose(event);
    }
  }

  const onSubminHandler = (event) => {
    event.preventDefault();
    props.addToQueue(data.commitHash);
    setData((prevState) => ({...prevState, ...{ isDisabled: !data.isDisabled }}));
  }

  const clearInput = (event) => {
    event.persist();
    const target = event.target.offsetParent.getElementsByTagName('input')[0].name;
    setData((prevState) => ({...prevState, ...{ [target]: '' }}));
  }

  return (
    <div className='Modal'>
      <div className='Modal-Overlay' onClick={onClose} >
        <div className='Modal-Body'>
          <form onSubmit={onSubminHandler}>
            <div className="Modal-Info">
              <h2 className="Modal-Title">New build</h2>
              <p className="Modal-Text">Enter the commit hash which you want to build.</p>
            </div>
            <Input className={inputClasses}>
              <input 
                type='text' 
                name='commitHash' 
                id='commitHash' 
                className='Input-Input Input-Input_border_default' 
                placeholder='Commit hash'
                onChange={onChangeHandler}
                value={data.commitHash}
              />
              { data.commitHash && <span className="Input-Icon Icon Icon_inputClear" onClick={clearInput}></span> }
            </Input>
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
          </form>
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  commitHash: '',
  isDisabled: false,
  isShowError: false
}

const mapStateToProps = (state) => ({
  buildRequestRes: state.buildRequestRes
})

const mapDispatchToProps = (dispatch) => ({
  addToQueue: (commitHash) => dispatch(addToQueue(commitHash)),
  cleanSaveCode: () => dispatch(cleanSaveCode()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
