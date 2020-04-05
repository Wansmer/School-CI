import React from 'react';
import { connect } from 'react-redux';
import './FormField.scss';

const FormField = React.memo((props) => {

  return (
    <div className={ props.className }>
      { props.children }
    </div>
  )
});

const mapStateToProps = (state) => ({
  // ...
}) 

export default connect(mapStateToProps)(FormField);
