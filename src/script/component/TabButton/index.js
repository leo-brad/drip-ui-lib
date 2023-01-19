import React from 'react';
import style from './index.module.css';

class TabButton extends React.Component {
  render() {
    return(
      <button className={[style.tabButton, style.active].join(' ')}>
      </button>
    );
  }
}

export default TabButton;
