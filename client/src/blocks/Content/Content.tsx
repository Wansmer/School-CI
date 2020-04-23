import React from 'react';
import './Content.scss';
import {expandClasses} from '../../utils';

export interface ContentProps {
  className?: string;
  classes: Classes;
  children: any;
}

const Content: React.FC<ContentProps> = (props) => {
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
