import React from 'react';
import './Form.scss';

function Form(props) {
  return (
    <form action="" className="Form Content-Form">
      <div className="Form-Info">
        <h2 className="Form-Title">Settings</h2>
        <p className="Form-Text">Configure repository connection and&#160;synchronization settings.</p>
      </div>
      <div className="Form-Field">

      </div>
        <div className="Form-Field">

        </div>
        <div className="Form-Field">

        </div>
        <div className="Form-Field">

        </div>
        <div className="Form-Field Content-Form-Field">
          <a href="/build-history.html" className="Button Button_size_l Button_type_action Form-Button">
            <span className="Button-Text">Save</span>
          </a>
          <a href="/#" className="Button Button_size_l Button_type_control Form-Button">
            <span className="Button-Text">Cancel</span>
          </a>
        </div>
      </form>
  )
}

export default Form;
