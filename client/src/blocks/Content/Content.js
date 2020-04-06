import React from 'react';
import './Content.scss';
import {expandClasses} from '../../utils';

const Content = (props) => {
  return (
    <section className={'Content ' + props.className}>
      <div className={'Content-Inner ' +
                        expandClasses(props.classes, 'Content', 'Inner', 'Container')}
      >
        {props.children}
      </div>
    </section>
  );
};

Content.defaultProps = {
  classes: {
    elems: {
      Inner: {
        mods: {
          alignVertical: 'top',
          alignHorizon: 'left'
        }
      }
    }
  }
};

export default React.memo(Content);
