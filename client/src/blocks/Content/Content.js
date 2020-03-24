import React from 'react';
import './Content.scss';

function Content(props) {
  console.log(props);
  return (
    <section className={props.className + ' ' + props.mainClass}>
      <div className={'Content-Inner Container' + ' ' +
                  'Content-Inner_alignHorizon_' + props.elems.Inner.mods.alignHorizon + ' ' +
                  'Content-Inner_alignVertical_' + props.elems.Inner.mods.alignVertical
                   }>
        {props.children}
      </div>
    </section>
  )
}

Content.defaultProps = {
  mainClass: 'Content',
  elems: {
    Inner: {
      mods: {
        alignVertical: 'top',
        alignHorizon: 'left'
      }
    }
  }
}

export default Content;
