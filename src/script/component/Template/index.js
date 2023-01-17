import React from 'react';
import style from './index.module.css';

class Template extends React.Component {
  render() {
    const { id, } = this.props;
    return(
      <div id={id} className={style.template} />
    );
  }
}

export default Template;
