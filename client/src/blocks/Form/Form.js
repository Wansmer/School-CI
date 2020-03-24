import React from 'react';
import './Form.scss';

function Form(props) {
  return (
    <form action="" className="Form Content-Form">
      <div classNameName="Form-Info">
        <h2 className="Form-Title">Settings</h2>
        <p className="Form-Text">Configure repository connection and&#160;synchronization settings.</p>
      </div>
      <div className="Form-Field">
        <div className="Input Input_direction_column">
          <label for="repo_id" className="Input-Label Input-Label_required">GitHub repository</label>
          <input type="text" name="repo" id="repo_id" className="Input-Input Input-Input_border_default" placeholder="user-name/repo-name" required />
          {/* <span className="Input-Icon Icon Icon_inputClear"></span> */}
        </div>
      </div>
        <div className="Form-Field">
          <div className="Input Input_direction_column">
            <label for="command_id" className="Input-Label">Build command</label>
            <input type="text" name="command" id="command_id" className="Input-Input Input-Input_border_default" value="npm ci && npm run build" />
            <span className="Input-Icon Icon Icon_inputClear"></span>
          </div>
        </div>
        <div className="Form-Field">
          <div className="Input Input_direction_column">
            <label for="branch_id" className="Input-Label">Main branch</label>
            <input type="text" name="branch" id="branch_id" className="Input-Input Input-Input_border_default" value="master " autofocus />
            <span className="Input-Icon Icon Icon_inputClear"></span>
          </div>
        </div>
        <div className="Form-Field">
          <div className="Input Input_direction_row Content-Form-Input">
            <label for="sync_id" className="Input-Label">Synchronize every</label>
            <input type="text" name="sync" id="sync_id" className="Input-Input Input-Input_border_default Content-Form-Input_small" value="10" />
            <div className="Input-Text">minutes</div>
          </div>
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
