import React from 'react';
import './Input.scss';

function Input(props) {
  return (
    <div className="Input Input_direction_column">
      <label htmlFor="repo_id" className="Input-Label Input-Label_required">GitHub repository</label>
      <input type="text" name="repo" id="repo_id" className="Input-Input Input-Input_border_default" placeholder="user-name/repo-name" required />
      {/* <span className="Input-Icon Icon Icon_inputClear"></span> */}
    </div>
  )
}

export default Input;
