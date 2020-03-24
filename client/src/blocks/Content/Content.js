import React from 'react';
import './Content.scss';
// Content-Inner_alignHorizon_center Content-Inner_alignVertical_center Container
function Content(props) {
  return (
    <section class={props.className + ' ' + props.mainClass}>
      <div class={'Content-Inner Container' + ' ' +
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
